import { Module } from '@nestjs/common';
import { MandatoryWebhookService } from './mandatory-webhook.service';
import { MandatoryWebhookController } from './mandatory-webhook.controller';

@Module({
  providers: [MandatoryWebhookService],
  controllers: [MandatoryWebhookController]
})
export class MandatoryWebhookModule {}
