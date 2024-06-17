import { Module } from '@nestjs/common';
import { WebhookRepository } from '@modules/webhook/webhook.repository';
import { WebhookService } from '@modules/webhook/webhook.service';

@Module({
  providers: [WebhookService, WebhookRepository],
  exports: [WebhookService],
})
export class WebhookModule {}
