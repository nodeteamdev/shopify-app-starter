import { Module } from '@nestjs/common';
import { MandatoryWebhookService } from './mandatory-webhook.service';
import { MandatoryWebhookController } from './mandatory-webhook.controller';
import { EmailModule } from '@modules/email/email.module';

@Module({
  imports: [EmailModule],
  providers: [MandatoryWebhookService],
  controllers: [MandatoryWebhookController]
})
export class MandatoryWebhookModule {}
