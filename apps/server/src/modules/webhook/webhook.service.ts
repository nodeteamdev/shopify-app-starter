import { Request } from 'express';
import {
  Injectable,
  Logger,
  RawBodyRequest,
  UnauthorizedException,
} from '@nestjs/common';
import { AppSubscriptionStatusesEnum, Prisma, Webhook } from '@prisma/client';
import { WebhookRepository } from '@modules/webhook/webhook.repository';
import { ShopifyAppInstallService } from '@modules/shopify-app-install/shopify-app-install.service';
import { ShopService } from '@modules/shop/shop.service';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';
import { AppSubscriptionService } from '@modules/app-subscription/app-subscription.service';
import { AppSubscriptionRequest } from '@modules/webhook/interfaces/app-subscription-request';

@Injectable()
export class WebhookService {
  private readonly logger: Logger = new Logger(WebhookService.name);

  constructor(
    private readonly webhookRepository: WebhookRepository,
    private readonly shopifyAppInstallService: ShopifyAppInstallService,
    private readonly shopService: ShopService,
    private readonly shopifyAuthSessionService: ShopifyAuthSessionService,
    private readonly appSubscriptionService: AppSubscriptionService,
  ) {}

  public create(data: Prisma.WebhookCreateInput): Promise<Webhook> {
    return this.webhookRepository.create(data);
  }

  public findOne(webhookId: string): Promise<Webhook | null> {
    return this.webhookRepository.findOne(webhookId);
  }

  public async isDuplicate(webhookId: string): Promise<boolean> {
    const webhook: Webhook | null = await this.findOne(webhookId);

    if (webhook) {
      Logger.debug(
        `Webhook with id: ${webhookId} was already handled: ${webhook.createdAt}`,
      );

      return true;
    }

    return false;
  }

  public async validateWebHook(req: RawBodyRequest<Request>): Promise<boolean> {
    const { valid } = await this.shopifyAppInstallService.validateWebhook(req);

    this.logger.debug(
      `WebHook received for the topic: ${req?.headers['x-shopify-topic']}`,
    );

    if (!valid) {
      throw new UnauthorizedException('Webhook is invalid');
    }

    if (!valid) {
      this.logger.error(
        `WebHook validation has failed for the WebHook with topic: ${req?.headers['x-shopify-topic']}`,
      );
    }

    return valid;
  }

  public async handleUpdateShopWebhook(
    req: RawBodyRequest<Request>,
  ): Promise<void> {
    const webhookId = req.headers['x-shopify-webhook-id']?.toString();

    if (await this.isDuplicate(webhookId)) return;

    const { id: shopId } = req.body;

    Logger.debug(
      `Webhook for updating shop with id: ${shopId}. ${JSON.stringify({
        body: req.body,
        headers: req.headers,
      })}`,
    );

    try {
      await this.updateShop(String(shopId));

      Logger.debug(`Shop with id: ${shopId} was successfully updated`);

      await this.saveWebhook(req);
    } catch (error) {
      Logger.debug(
        `An error occurs during updating shop with id: ${shopId}. ${JSON.stringify(
          {
            error,
          },
          null,
          2,
        )}`,
      );
    }
  }

  public async handleUninstallAppWebhook(
    req: RawBodyRequest<Request>,
  ): Promise<void> {
    const webhookId = req.headers['x-shopify-webhook-id'] as string;

    if (await this.isDuplicate(webhookId)) return;

    const { id: shopId } = req.body;

    Logger.debug(
      `Webhook for uninstalling app from the shop with id: ${shopId}. ${JSON.stringify(
        {
          body: req.body,
          headers: req.headers,
        },
      )}`,
    );

    try {
      await this.uninstallApp(String(shopId));

      Logger.debug(
        `App was successfully uninstalled from the shop with id: ${shopId}`,
      );

      await this.saveWebhook(req);
    } catch (error) {
      Logger.debug(
        `An error occurs during uninstalling app from the shop with id: ${shopId}: ${JSON.stringify(
          {
            error,
          },
          null,
          2,
        )}`,
      );
    }
  }

  public async uninstallApp(shopId: string): Promise<void> {
    const shop = await this.shopService.findOne(shopId);

    if (!shop) {
      return Logger.debug(
        `App uninstall webhook tried to uninstall unexisting shop with id: ${shopId}`,
      );
    }

    await this.shopifyAuthSessionService.deleteManyByShopId(shop.id);
    await this.shopService.delete(shop.id);
  }

  public async handleUpdateAppSubscription(
    req: RawBodyRequest<Request>,
  ): Promise<void> {
    const webhookId = req.headers['x-shopify-webhook-id'] as string;

    if (await this.isDuplicate(webhookId)) return;

    const {
      app_subscription: appSubscription,
    }: { app_subscription: AppSubscriptionRequest } = req.body;
    const { admin_graphql_api_shop_id: shopId } = appSubscription;

    Logger.debug(
      `Webhook for updating app subscription from the shop with id: ${shopId}. ${JSON.stringify(
        {
          body: req.body,
          headers: req.headers,
        },
      )}`,
    );

    try {
      await this.updateAppSubscription(shopId, appSubscription);

      Logger.debug(
        `App subscription was successfully updated from the shop with id: ${shopId}`,
      );

      await this.saveWebhook(req);
    } catch (error) {
      Logger.debug(
        `An error occurs during updating app subscription from the shop with id: ${shopId}: ${JSON.stringify(
          {
            error,
          },
          null,
          2,
        )}`,
      );
    }
  }

  private async updateAppSubscription(
    shopId: string,
    appSubscription: AppSubscriptionRequest,
  ): Promise<void> {
    const shop = await this.shopService.findOne(shopId);

    if (!shop) {
      return Logger.debug(
        `App subscription update webhook tried to update unexisting shop with id: ${shopId}`,
      );
    }

    const { admin_graphql_api_id: appSubscriptionId, status } = appSubscription;

    switch (status) {
      case AppSubscriptionStatusesEnum.ACTIVE:
        await this.appSubscriptionService.update(
          appSubscriptionId,
          AppSubscriptionStatusesEnum.ACTIVE,
        );
        break;
      case AppSubscriptionStatusesEnum.CANCELLED:
        await this.appSubscriptionService.update(
          appSubscriptionId,
          AppSubscriptionStatusesEnum.CANCELLED,
        );
        break;
      case AppSubscriptionStatusesEnum.DECLINED:
        await this.appSubscriptionService.update(
          appSubscriptionId,
          AppSubscriptionStatusesEnum.DECLINED,
        );
        break;
      default:
        Logger.debug(`Unhandled app subscription status: ${status}`);
    }
  }

  private async updateShop(shopId: string): Promise<void> {
    const shop = await this.shopService.findOne(shopId);

    if (!shop) {
      return Logger.debug(
        `Shop update webhook tried to update unexisting shop with id: ${shopId}`,
      );
    }

    const shopifySession =
      await this.shopifyAuthSessionService.getShopifySessionByShopId(shop.id);

    const { id, currencyCode, ...rest } =
      await this.shopService.getShopInfo(shopifySession);

    const shopUpdateInput = {
      ...rest,
      primaryDomain: rest.primaryDomain.host,
    };

    await this.shopService.update(shop.id, {
      ...shopUpdateInput,
    });
  }

  private saveWebhook(req: RawBodyRequest<Request>): Promise<Webhook> {
    return this.create({
      id: req.headers['x-shopify-webhook-id']?.toString(),
      body: req.body,
      headers: req.headers,
      topic: req.headers['x-shopify-topic']?.toString(),
    });
  }
}
