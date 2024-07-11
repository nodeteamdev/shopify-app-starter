import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { ShopifyService } from '@modules/shopify-api/services/shopify.service';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';
/* Services */

@Injectable()
export class VerifyRequest implements NestMiddleware {
  private TEST_QUERY = `
    {
        shop {
        name,
        id
        }
    }`;
  constructor(
    private shopifyService: ShopifyService,
    private sessionService: ShopifyAuthSessionService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { host } = req.headers;

      let shop = req.params.shopName;

      if (host) {
        const shopify = this.shopifyService.shopifyApi;
        const sessionId = await shopify.session.getCurrentId({
          isOnline: true,
          rawRequest: req,
          rawResponse: res,
        });

        const session = await this.sessionService.getSession(sessionId);
        shop = session?.shop;

        if (new Date(session?.expires) > new Date()) {
          res.setHeader(
            'Content-Security-Policy',
            `frame-ancestors https://${session.shop} https://admin.shopify.com;`,
          );
          return next();
        }

        const authBearer = req.headers.authorization?.match(/Bearer (.*)/);

        if (authBearer) {
          if (!shop) {
            if (session) {
              shop = session.shop;
            } else if (shopify.config.isEmbeddedApp) {
              if (authBearer) {
                const payload = await shopify.session.decodeSessionToken(
                  authBearer[1],
                );

                shop = payload.dest.replace('https://', '');
              }
            }
          }

          res.status(403);
          res.header('X-Shopify-API-Request-Failure-Reauthorize', '1');
          res.header(
            'X-Shopify-API-Request-Failure-Reauthorize-Url',
            `/shopify-auth?shop=${shop}&host=${host}`,
          );

          return res.end();
        } else {
          return res
            .status(400)
            .send({ message: 'No authentication bearer token found' });
        }
      }

      return res.status(400).send({ message: 'No shop found' });
    } catch (error) {
      console.error(error);

      return res
        .status(401)
        .send({ error: "Nah I ain't serving this request" });
    }
  }
}
