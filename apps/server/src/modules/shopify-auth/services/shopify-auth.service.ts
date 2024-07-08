import { Request, Response } from 'express';
import { Injectable } from '@nestjs/common';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { ShopifyAuthShopRepository } from '@modules/shopify-auth/repositories/shopify-auth-shop.repository';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';
import { ShopService } from '@modules/shop/shop.service';

@Injectable()
export class ShopifyAuthService {
  constructor(
    private readonly shopifyAuthShopRepository: ShopifyAuthShopRepository,
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

    await ShopifyAppInstallRepository.shopify.webhooks.register({
      session,
    });

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

    const shop = await this.shopService.getShopInfo(session);

    const shopCreateInput = {
      ...shop,
      primaryDomain: shop.primaryDomain.host
    };

    await this.shopifyAuthShopRepository.save(shopCreateInput);

    return shop.name;
  }
}
