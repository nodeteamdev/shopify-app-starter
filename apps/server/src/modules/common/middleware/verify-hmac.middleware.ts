import crypto from 'crypto';
import CustomRequest from '@modules/common/types/custom-request.type';
import { ShopifyService } from '@modules/shopify-api/services/shopify.service';
import { Injectable, Module, NestMiddleware } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NextFunction, Response } from 'express';

/* Services */

@Injectable()
@Module({
  imports: [ConfigModule],
})
export class VerifyHmac implements NestMiddleware {
  constructor(
    private configService: ConfigService,
    private shopifyService: ShopifyService,
  ) {}

  use(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const shopify = this.shopifyService.shopifyApi;
      const generateHash = crypto
        .createHmac(
          'sha256',
          this.configService.get<string>('SHOPIFY_API_SECRET'),
        )
        .update(req.originalBody.toString(), 'utf-8')
        .digest('base64');

      const topic = req.headers['x-shopify-topic'];
      const shop = req.headers['x-shopify-shop-domain'];
      const hmac = req.headers['x-shopify-hmac-sha256'];

      if (shopify.auth.safeCompare(generateHash, hmac)) {
        console.log(`--> Processed ${topic} webhook for ${shop}`);
        next();
      } else {
        return res.status(401).send();
      }
    } catch (_err) {
      return res.status(401).send();
    }
    next();
  }
}
