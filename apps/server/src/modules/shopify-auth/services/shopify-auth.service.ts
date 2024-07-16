import { Request, Response } from 'express';
import { Injectable } from '@nestjs/common';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';
import { ShopService } from '@modules/shop/shop.service';

@Injectable()
export class ShopifyAuthService {
  constructor(
    private readonly shopifyAuthSessionService: ShopifyAuthSessionService,
    private readonly shopService: ShopService,
  ) {}

  public async storeOnlineToken(req: Request, res: Response): Promise<string> {
    const callbackResponse =
      await ShopifyAppInstallRepository.shopify.auth.callback({
        rawRequest: req,
        rawResponse: res,
      });

    const { session } = callbackResponse;

    await this.shopifyAuthSessionService.save(session);

    const shopInfo = await this.shopService.getShopInfo(session);

    const { name: shopName } = await this.shopService.findOne(shopInfo.id);

    return shopName;
  }
}
