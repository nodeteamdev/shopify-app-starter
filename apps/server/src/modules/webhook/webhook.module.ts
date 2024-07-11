import { VerifyHmac } from '@modules/common/middleware/verify-hmac.middleware';
import { PrismaModule } from '@modules/common/providers/prisma';
import { ShopModule } from '@modules/shop/shop.module';
import { ShopifyService } from '@modules/shopify-api/services/shopify.service';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';
import { AppSubscriptionModule } from '@modules/app-subscription/app-subscription.module';
import { WebhookController } from '@modules/webhook/webhook.controller';
import { WebhookRepository } from '@modules/webhook/webhook.repository';
import { WebhookService } from '@modules/webhook/webhook.service';
import { MiddlewareConsumer, Module } from '@nestjs/common';

@Module({
  imports: [
    PrismaModule,
    ShopifyAppInstallModule,
    ShopModule,
    ShopifyAuthModule,
    AppSubscriptionModule,
  ],
  providers: [WebhookService, WebhookRepository, ShopifyService],
  exports: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyHmac).forRoutes('*');
  }
}
