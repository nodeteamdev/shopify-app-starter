import { Request, Response } from 'express';
import { Injectable, Logger } from '@nestjs/common';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';
import { ShopService } from '@modules/shop/shop.service';
import { ShopifyAppInstallService } from '@modules/shopify-app-install/shopify-app-install.service';
import { WebhookConfig } from '@modules/shopify-app-install/interfaces/webhook-config.interface';
import { extractIdFromShopify } from '@modules/common/helpers/extract-id-from-shopify.helper';
import { AppSubscriptionService } from '@modules/subscription/services/app-subscription.service';
import { AppSubscriptionStatusesEnum } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { ShopifyConfig } from '@config/shopify.config';
import { BulkOperationService } from '@modules/bulk-operation/bulk-operation.service';

@Injectable()
export class ShopifyAuthService {
  private readonly logger: Logger = new Logger(ShopifyAuthService.name);

  constructor(
    private readonly shopifyAuthSessionService: ShopifyAuthSessionService,
    private readonly shopService: ShopService,
    private readonly shopifyAppInstallService: ShopifyAppInstallService,
    private readonly appSubscriptionService: AppSubscriptionService,
    private readonly configService: ConfigService,
    private readonly bulkOperationService: BulkOperationService,
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

  public async storeOnlineToken(req: Request, res: Response): Promise<void> {
    this.shopifyAppInstallService.validateHmac(req.query);

    const callbackResponse =
      await ShopifyAppInstallRepository.shopify.auth.callback({
        rawRequest: req,
        rawResponse: res,
      });

    const { session } = callbackResponse;

    const shopInfo = await this.shopService.getShopInfo(session);

    const extractedShopId = extractIdFromShopify(shopInfo.id);

    await this.shopifyAuthSessionService.save(session, extractedShopId);

    this.logger.debug(
      `Online Session has been retrieved for the shop: ${
        shopInfo.name
      }: ${JSON.stringify({ session }, null, 2)}`,
    );

    const orders = await this.bulkOperationService.parseAndSaveOrders(
      shopInfo.myshopifyDomain,
    );

    if (orders) {
      this.logger.debug(`Orders have been saved for the shop: ${shopInfo.name}`);
    }

    const { apiKey } = this.configService.get<ShopifyConfig>('shopify');

    const appSubscription =
      await this.appSubscriptionService.findOneByShopId(extractedShopId);

    if (!appSubscription) {
      return res
        .status(200)
        .redirect(
          `https://${shopInfo.myshopifyDomain}/admin/apps/${apiKey}/plans`,
        );
    }

    if (appSubscription.status !== AppSubscriptionStatusesEnum.ACTIVE) {
      await this.appSubscriptionService.delete(appSubscription.id);

      return res
        .status(200)
        .redirect(
          `https://${shopInfo.myshopifyDomain}/admin/apps/${apiKey}/plans`,
        );
    }

    res
      .status(200)
      .redirect(`https://${shopInfo.myshopifyDomain}/admin/apps/${apiKey}`);
  }
}
