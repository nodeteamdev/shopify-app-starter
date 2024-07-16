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
    const callbackResponse = await ShopifyAppInstallRepository.shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    const { session } = callbackResponse;

    const { id: shopId } = await this.shopService.getShopInfo(session);

    await this.shopifyAuthSessionService.save(session, shopId);

    const { name: shopName } = await this.shopService.findOne(shopId);

    return shopName;
  }
}
