import { randomUUID } from 'node:crypto';
import { EmailService } from '@modules/email/email.service';
import { ShopifyAppInstallService } from '@modules/shopify-app-install/shopify-app-install.service';
import { WebhookService } from '@modules/webhook/webhook.service';
import { Injectable, Logger, RawBodyRequest, UnauthorizedException } from '@nestjs/common';
import { Webhook } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class MandatoryWebhookService {
  private readonly logger: Logger = new Logger(MandatoryWebhookService.name);

  constructor(
    private readonly shopifyAppInstallService: ShopifyAppInstallService,
    private readonly webhookService: WebhookService,
    private readonly emailService: EmailService,
  ) {}

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

    this.logger.debug(
      `Webhook for uninstalling app from the shop with id: ${shopId}. ${JSON.stringify(
        {
          body: req.body,
          headers: req.headers,
        },
      )}`,
    );

    try {
      await this.uninstallApp(shopId);

      this.logger.debug(
        `App was successfully uninstalled from the shop with id: ${shopId}`,
      );

      await this.saveWebhook(req);
    } catch (error) {
      this.logger.debug(
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

    this.logger.debug(
      `${loggerInfo}: ${shopId}. ${JSON.stringify({
        body: req.body,
        headers: req.headers,
      })}`,
    );

    try {
      await this.saveWebhook(req);
      await emailServiceMethod(data);
    } catch (error) {
      this.logger.debug(
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
    return this.webhookService.create({
      id: randomUUID(),
      webhookId: req.headers['x-shopify-webhook-id']?.toString(),
      body: req.body,
      headers: req.headers,
      topic: req.headers['x-shopify-topic']?.toString(),
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
    //   return this.logger.debug(
    //     `App uninstall webhook tried to uninstall unexisting shop with id: ${shopId}`,
    //   );
    // }

    // await this.webShopService.update(webShop.id, {
    //   config: null,
    // });
  }
}
