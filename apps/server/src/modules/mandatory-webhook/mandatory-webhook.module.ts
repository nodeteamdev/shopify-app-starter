import { EmailModule } from '@modules/email/email.module';
import { MandatoryWebhookController } from '@modules/mandatory-webhook/mandatory-webhook.controller';
import { MandatoryWebhookService } from '@modules/mandatory-webhook/mandatory-webhook.service';
import { ShopifyModule } from '@modules/shopify-api/shopify.module';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';
import { WebhookModule } from '@modules/webhook/webhook.module';
import { Module } from '@nestjs/common';
import { ShopModule } from '@modules/shop/shop.module';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';

@Module({
  imports: [
    EmailModule,
    WebhookModule,
    ShopifyAppInstallModule,
    ShopifyModule,
    ShopModule,
    ShopifyAuthModule,
  ],
  providers: [MandatoryWebhookService],
  controllers: [MandatoryWebhookController],
  exports: [MandatoryWebhookService],
})
export class MandatoryWebhookModule {}
