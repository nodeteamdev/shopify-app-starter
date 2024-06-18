import { Controller, Post, RawBodyRequest, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { MandatoryWebhookService } from './mandatory-webhook.service';

@ApiTags('Mandatory-webhook')
@Controller('mandatory-webhook')
export class MandatoryWebhookController {
  constructor(private readonly mandatoryWebhookService: MandatoryWebhookService) {}

  @Post('/customers/data-request')
  public async customerDataRequest(
    @Req() req: RawBodyRequest<Request>,
  ): Promise<void> {
    await this.mandatoryWebhookService.validateWebHook(req);

    this.mandatoryWebhookService.handleCustomersDataRequestWebhook(req);
  }

  @Post('/customers/redact')
  public async customerRedact(
    @Req() req: RawBodyRequest<Request>,
  ): Promise<void> {
    await this.mandatoryWebhookService.validateWebHook(req);

    this.mandatoryWebhookService.handleCustomersRedactRequestWebhook(req);
  }

  @Post('/shops/redact')
  public async shopRedact(@Req() req: RawBodyRequest<Request>): Promise<void> {
    await this.mandatoryWebhookService.validateWebHook(req);

    this.mandatoryWebhookService.handleUninstallAppWebhook(req);
  }
}
