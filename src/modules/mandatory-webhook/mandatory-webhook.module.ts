import { Module } from '@nestjs/common';
import { MandatoryWebhookService } from './mandatory-webhook.service';
import { MandatoryWebhookController } from './mandatory-webhook.controller';
import { EmailModule } from '@modules/email/email.module';
import { WebhookModule } from '@modules/webhook/webhook.module';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';

@Module({
  imports: [EmailModule, WebhookModule, ShopifyAppInstallModule],
  providers: [MandatoryWebhookService],
  controllers: [MandatoryWebhookController],
  exports: [MandatoryWebhookService]
})
export class MandatoryWebhookModule {}
