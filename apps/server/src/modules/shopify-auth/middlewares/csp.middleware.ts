import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CSP implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const shop = req.query.shop;

    if (ShopifyAppInstallRepository.shopify.config.isEmbeddedApp && shop) {
      res.setHeader(
        'Content-Security-Policy',
        `frame-ancestors https://${shop} https://admin.shopify.com;`,
      );
    } else {
      res.setHeader('Content-Security-Policy', "frame-ancestors 'none';");
    }

    next();
  }
}
