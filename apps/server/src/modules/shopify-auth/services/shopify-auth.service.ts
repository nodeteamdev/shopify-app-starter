import { Request, Response } from 'express';
import { Injectable, Logger } from '@nestjs/common';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';
import { ShopService } from '@modules/shop/shop.service';
import { ShopifyAppInstallService } from '@modules/shopify-app-install/shopify-app-install.service';
import { WebhookConfig } from '@modules/shopify-app-install/interfaces/webhook-config.interface';
import { extractIdFromShopify } from '@modules/common/helpers/extract-id-from-shopify.helper';

@Injectable()
export class ShopifyAuthService {
  private readonly logger: Logger = new Logger(ShopifyAuthService.name);

  constructor(
    private readonly shopifyAuthSessionService: ShopifyAuthSessionService,
    private readonly shopService: ShopService,
    private readonly shopifyAppInstallService: ShopifyAppInstallService,
  ) {}

  public async storeOfflineToken(req: Request, res: Response) {
    this.shopifyAppInstallService.validateHmac(req.query);

    const callbackResponse =
      await ShopifyAppInstallRepository.shopify.auth.callback({
        rawRequest: req,
        rawResponse: res,
      });

    const { session } = callbackResponse;

    const createdShop = await this.shopifyAppInstallService.setupShop(session);

    this.logger.debug(
      `Shop has been successfully setup for the shop: ${
        createdShop.name
      }: ${JSON.stringify(createdShop, null, 2)}`,
    );

    await this.shopifyAuthSessionService.save(session, createdShop.id);

    this.logger.debug(
      `Offline Session has been retrieved for the shop: ${
        createdShop.name
      }: ${JSON.stringify({ session }, null, 2)}`,
    );

    const webhookConfigs: WebhookConfig[] =
      await this.shopifyAppInstallService.setupWebhooks(session);

    this.logger.debug(
      `Webhooks have been setup successfully for shop: ${
        createdShop.name
      }: ${JSON.stringify({ webhookConfigs }, null, 2)}`,
    );

    return await ShopifyAppInstallRepository.shopify.auth.begin({
      shop: session.shop,
      callbackPath: `/api/v1/shopify-auth/online`,
      isOnline: true,
      rawRequest: req,
      rawResponse: res,
    });
  }

  public async storeOnlineToken(req: Request, res: Response): Promise<string> {
    this.shopifyAppInstallService.validateHmac(req.query);

    const callbackResponse =
      await ShopifyAppInstallRepository.shopify.auth.callback({
        rawRequest: req,
        rawResponse: res,
      });

    const { session } = callbackResponse;

    const { id: shopId, name: shopName } =
      await this.shopService.getShopInfo(session);

    await this.shopifyAuthSessionService.save(session, extractIdFromShopify(shopId));

    this.logger.debug(
      `Online Session has been retrieved for the shop: ${shopName}: ${JSON.stringify(
        { session },
        null,
        2,
      )}`,
    );

    return shopName;
  }
}
