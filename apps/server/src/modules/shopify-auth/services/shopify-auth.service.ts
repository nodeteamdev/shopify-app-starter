import { Request, Response } from 'express';
import { Injectable } from '@nestjs/common';
import { ShopifyAuthActiveStoreRepository } from '@modules/shopify-auth/repositories/shopify-active-store.repository';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-session.service';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';

@Injectable()
export class ShopifyAuthService {
  constructor(
    private readonly shopifyAuthActiveStoreRepository: ShopifyAuthActiveStoreRepository,
    private readonly shopifyAuthSessionService: ShopifyAuthSessionService,
  ) {}

  public async storeOfflineToken(req: Request, res: Response): Promise<void> {
    const callbackResponse = await ShopifyAppInstallRepository.shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    const { session } = callbackResponse;

    await this.shopifyAuthSessionService.storeSession(session);

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

    await this.shopifyAuthSessionService.storeSession(session);

    const { shop } = session;

    await this.shopifyAuthActiveStoreRepository.upsertShopifyActiveStore(shop);

    return shop;
  }
}
