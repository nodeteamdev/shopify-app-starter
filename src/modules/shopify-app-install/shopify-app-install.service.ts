import { createHmac } from 'node:crypto';
import { Request, Response } from 'express';
import { Injectable, RawBodyRequest, UnauthorizedException } from '@nestjs/common';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { ShopifyRequestQuery } from '@modules/shopify-app-install/types/shopify-request-query-type';
import { WebhookValidation } from '@shopify/shopify-api';


@Injectable()
export class ShopifyAppInstallService {
  constructor(private readonly shopifyAppInstallRepository: ShopifyAppInstallRepository) {}

  public validateHmac(queryParams: ShopifyRequestQuery): boolean {
    const sharedSecret = process.env.SHOPIFY_API_SECRET;
    const { hmac, ...rest } = queryParams;

    const message = Object.entries(rest)
      .map(([key, value]) => {
        let resultValue: string;

        if (Array.isArray(value)) {
          resultValue = value.join('&');
        } else {
          resultValue = value as string;
        }

        return `${key}=${resultValue}`;
      })
      .sort()
      .join('&');

    const calculatedHmac = createHmac('sha256', sharedSecret)
      .update(message)
      .digest('hex');

    if (calculatedHmac !== hmac) {
      throw new UnauthorizedException('Error');
    }

    return true;
  }

  public beginAuth(req: Request, res: Response): Promise<string> {
    return this.shopifyAppInstallRepository.beginAuth(req, res);
  }

  public validateWebhook(req: RawBodyRequest<Request>): Promise<WebhookValidation> {
    return ShopifyAppInstallRepository.shopify.webhooks.validate({
      rawBody: req?.rawBody?.toString() || '',
      rawRequest: req,
    });
  }

  // TODO change 
  public finishAuth(req: Request, res: Response): Promise<any> {
    return this.shopifyAppInstallRepository.finishAuth(req, res);
  }
}
