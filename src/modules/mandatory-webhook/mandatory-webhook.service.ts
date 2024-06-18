import { EmailService } from '@modules/email/email.service';
import { ShopifyAppInstallService } from '@modules/shopify-app-install/shopify-app-install.service';
import { WebhookService } from '@modules/webhook/webhook.service';
import { Injectable, Logger, RawBodyRequest, UnauthorizedException } from '@nestjs/common';
import { EcommercePlatformsEnum, Webhook } from '@prisma/client';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MandatoryWebhookService {
  constructor(
    private readonly shopifyAppInstallService: ShopifyAppInstallService,
    private readonly webhookService: WebhookService,
    private readonly emailService: EmailService,
  ) {}

  public async validateWebHook(req: RawBodyRequest<Request>): Promise<boolean> {
    const { valid } = await this.shopifyAppInstallService.validateWebhook(req);

    Logger.debug(
      `WebHook received for the topic: ${req?.headers['x-shopify-topic']}`,
    );

    if (!valid) {
      throw new UnauthorizedException('Webhook is invalid');
    }

    if (!valid) {
      Logger.error(
        `WebHook validation has failed for the WebHook with topic: ${req?.headers['x-shopify-topic']}`,
      );
    }

    return valid;
  }

  public handleCustomersDataRequestWebhook(
    req: RawBodyRequest<Request>,
  ): Promise<void> {
    return this.handleWebhookRequest(
      req,
      this.emailService.sendCustomerDataRequest,
      'Webhook for requesting customers data from the shop with id',
      'An error occurs during requesting customers data from the shop with id',
    );
  }

  public handleCustomersRedactRequestWebhook(
    req: RawBodyRequest<Request>,
  ): Promise<void> {
    return this.handleWebhookRequest(
      req,
      this.emailService.sendCustomerDataRequest,
      'Webhook for requesting customers redact from the shop with id',
      'An error occurs during requesting customers redact from the shop with id',
    );
  }

  public async handleUninstallAppWebhook(
    req: RawBodyRequest<Request>,
  ): Promise<void> {
    const webhookId = req.headers['x-shopify-webhook-id'] as string;

    if (await this.webhookService.isDuplicate(webhookId)) return;

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

  private async handleWebhookRequest(
    req: RawBodyRequest<Request>,
    emailServiceMethod: (data: string) => Promise<void>,
    loggerInfo: string,
    loggerError: string,
  ): Promise<void> {
    const webhookId = req.headers['x-shopify-webhook-id'] as string;
    const data = JSON.stringify(
      {
        body: req.body,
        headers: req.headers,
      },
      null,
      2,
    );

    if (await this.webhookService.isDuplicate(webhookId)) return;

    const { id: shopId } = req.body;

    Logger.debug(
      `${loggerInfo}: ${shopId}. ${JSON.stringify({
        body: req.body,
        headers: req.headers,
      })}`,
    );

    try {
      await this.saveWebhook(req);
      await emailServiceMethod(data);
    } catch (error) {
      Logger.debug(
        `${loggerError}: ${shopId}: ${JSON.stringify(
          {
            error,
          },
          null,
          2,
        )}`,
      );
    }
  }

  private saveWebhook(req: RawBodyRequest<Request>): Promise<Webhook> {
    const expiredAt = new Date();

    // Add 6 months
    expiredAt.setMonth(expiredAt.getMonth() + 6);

    return this.webhookService.create({
      id: uuidv4(),
      webhookId: req.headers['x-shopify-webhook-id']?.toString(),
      body: req.body,
      headers: req.headers,
      topic: req.headers['x-shopify-topic']?.toString(),
      ecommercePlatform: EcommercePlatformsEnum.SHOPIFY,
      expiredAt,
    });
  }

  public validateWebhook(req: RawBodyRequest<Request>): Promise<any> {
    return this.shopifyAppInstallService.validateWebhook(req);
  }

  public async uninstallApp(shopId: string): Promise<void> {
    return;
    // TODO WEBSHOP logic should be added

    // const webShop = await this.webShopService.findByShopifyShopId(
    //   getGlobalId(ShopifyGraphQlTypesEnum.SHOP, shopId),
    // );

    // if (!webShop) {
    //   return Logger.debug(
    //     `App uninstall webhook tried to uninstall unexisting shop with id: ${shopId}`,
    //   );
    // }

    // await this.webShopService.update(webShop.id, {
    //   ecommercePlatform: null,
    //   config: null,
    // });
  }
}
