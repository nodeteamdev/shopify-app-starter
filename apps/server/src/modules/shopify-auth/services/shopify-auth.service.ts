import { Request, Response } from 'express';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { ShopifyAuthStoreRepository } from '@modules/shopify-auth/repositories/shopify-auth-store.repository';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';
import { ShopService } from '@modules/shop/shop.service';
import { SHOP_NOT_FOUND } from '@modules/common/constants/errors.constants';

@Injectable()
export class ShopifyAuthService {
  constructor(
    private readonly shopifyAuthStoreRepository: ShopifyAuthStoreRepository,
    private readonly shopifyAuthSessionService: ShopifyAuthSessionService,
    private readonly shopService: ShopService,
  ) {}

  public async storeOfflineToken(req: Request, res: Response): Promise<void> {
    const callbackResponse = await ShopifyAppInstallRepository.shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    const { session } = callbackResponse;

    await this.shopifyAuthSessionService.save(session);

    const webhookRegisterResponse = await ShopifyAppInstallRepository.shopify.webhooks.register({
      session,
    });

    console.dir(webhookRegisterResponse, { depth: null });

    return await ShopifyAppInstallRepository.shopify.auth.begin({
      shop: session.shop,
      callbackPath: '/api/v1/shopify-auth/online',
      isOnline: true,
      rawRequest: req,
      rawResponse: res,
    });
  }

  public async storeOnlineToken(req: Request, res: Response): Promise<string> {
    const callbackResponse = await ShopifyAppInstallRepository.shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    const { session } = callbackResponse;

    await this.shopifyAuthSessionService.save(session);

    const { id: shopId } = await this.shopService.getShopInfo(session);

    const { shop: shopName } = session;

    await this.shopifyAuthStoreRepository.save(shopName, shopId);

    return shopName;
  }
}
