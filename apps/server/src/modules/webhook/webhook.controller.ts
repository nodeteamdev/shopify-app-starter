import { Request } from 'express';
import { Controller, Post, RawBodyRequest, Req } from '@nestjs/common';
import { WebhookService } from '@modules/webhook/webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('/update-shop')
  public async updateShop(@Req() req: RawBodyRequest<Request>): Promise<void> {
    await this.webhookService.validateWebHook(req);

    this.webhookService.handleUpdateShopWebhook(req);
  }

  @Post('/uninstall-app')
  public async uninstallUp(@Req() req: RawBodyRequest<Request>): Promise<void> {
    await this.webhookService.validateWebHook(req);

    this.webhookService.handleUninstallAppWebhook(req);
  }

  @Post('/update-app-subscription')
  public async updateAppSubscription(
    @Req() req: RawBodyRequest<Request>,
  ): Promise<void> {
    await this.webhookService.validateWebHook(req);

    this.webhookService.handleUpdateAppSubscription(req);
  }
}
