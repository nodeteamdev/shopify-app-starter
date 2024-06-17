import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac } from 'node:crypto';
import { Request, Response } from 'express';
import { ShopifyAppInstallRepository } from './shopify-app-install.repository';

export type ShopifyRequestQuery = {
  [key: string]:
    | undefined
    | string
    | string[]
    | ShopifyRequestQuery
    | ShopifyRequestQuery[];
};


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

  public beginAuth(req: Request, res: Response): Promise<any> {
    return this.shopifyAppInstallRepository.beginAuth(req, res);
  }
}
