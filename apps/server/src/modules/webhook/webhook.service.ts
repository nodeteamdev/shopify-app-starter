import { Request } from 'express';
import { Injectable, Logger, NotFoundException, RawBodyRequest, UnauthorizedException } from '@nestjs/common';
import { Prisma, Webhook } from '@prisma/client';
import { WebhookRepository } from '@modules/webhook/webhook.repository';
import { WEBHOOK_NOT_FOUND } from '@modules/common/constants/errors.constants';
import { ShopifyAppInstallService } from '@modules/shopify-app-install/shopify-app-install.service';
import { ShopService } from '@modules/shop/shop.service';
import { getGlobalId } from '@modules/common/helpers/get-global-id.helper';
import { GraphQlTypesEnum } from '@modules/shop/enums/graphql-types.enum';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';

@Injectable()
export class WebhookService {
  private readonly logger: Logger = new Logger(WebhookService.name);

  constructor(
    private readonly webhookRepository: WebhookRepository,
    private readonly shopifyAppInstallService: ShopifyAppInstallService,
    private readonly shopService: ShopService,
    private readonly shopifyAuthSessionService: ShopifyAuthSessionService
  ) {}

  public create(data: Prisma.WebhookCreateInput): Promise<Webhook> {
    return this.webhookRepository.create(data);
  }

  public async getOneByWebhookId(webhookId: string): Promise<Webhook | null> {
    const webhook = await this.webhookRepository.findOne(webhookId);

    if (!webhook) {
      throw new NotFoundException(WEBHOOK_NOT_FOUND);
    }

    return webhook;
  }

  public async isDuplicate(webhookId: string): Promise<boolean> {
    const webhook: Webhook | null = await this.getOneByWebhookId(webhookId);

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
      await this.updateShop(shopId);

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
      await this.uninstallApp(shopId);

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
    const shop = await this.shopService.findOne(
      getGlobalId(GraphQlTypesEnum.SHOP, shopId),
    );

    if (!shop) {
      return Logger.debug(
        `App uninstall webhook tried to uninstall unexisting shop with id: ${shopId}`,
      );
    }

    await this.shopService.delete(shop.id);
  }

  private async updateShop(shopId: string): Promise<void> {
    const shop = await this.shopService.findOne(
      getGlobalId(GraphQlTypesEnum.SHOP, shopId),
    );

    if (!shop) {
      return Logger.debug(
        `Shop update webhook tried to update unexisting shop with id: ${shopId}`,
      );
    }

    const session = await this.shopifyAuthSessionService.getSessionByShopName(shop.name);

    const shopInfo = await this.shopService.getShopInfo(session);

    const shopUpdateInput = {
      ...shop,
      primaryDomain: shopInfo.primaryDomain.host
    };

    await this.shopService.update(shop.id, {
      ...shopUpdateInput,
      updatedAt: new Date(),
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
