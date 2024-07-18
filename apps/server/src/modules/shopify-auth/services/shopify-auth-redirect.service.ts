import { ShopifyConfig } from '@config/shopify.config';
import { SHOP_NOT_FOUND } from '@modules/common/constants/errors.constants';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Injectable()
export class ShopifyAuthRedirectService {
  constructor(private readonly configService: ConfigService) {}

  public async redirect(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const { hostName } = this.configService.get<ShopifyConfig>('shopify');

    if (!req.query.shop) {
      throw new NotFoundException(SHOP_NOT_FOUND);
    }

    const shop = ShopifyAppInstallRepository.shopify.utils.sanitizeShop(
      <string>req.query.shop,
    );

    if (req.query.embedded === '1') {
      const queryParams = new URLSearchParams({
        ...req.query,
        shop,
        redirectUri: `https://${hostName}/api/v1/shopify-auth?shop=${shop}&host=${req.query.host}`,
      }).toString();

      return res.redirect(`/exitframe?${queryParams}`);
    }

    return ShopifyAppInstallRepository.shopify.auth.begin({
      shop,
      callbackPath: '/api/v1/shopify-auth/offline',
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    });
  }
}
