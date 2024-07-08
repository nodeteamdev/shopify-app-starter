import { VerifyHmac } from '@modules/common/middleware/verify-hmac.middleware';
import { PrismaModule } from '@modules/common/providers/prisma';
import { ShopifyModule } from '@modules/shopify-api/shopify.module';
import { WebhookRepository } from '@modules/webhook/webhook.repository';
import { WebhookService } from '@modules/webhook/webhook.service';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { WebhookController } from '@modules/webhook/webhook.controller';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';
import { ShopModule } from '@modules/shop/shop.module';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';

@Module({
  imports: [PrismaModule, ShopifyAppInstallModule, ShopModule, ShopifyAuthModule],
  providers: [WebhookService, WebhookRepository],
  exports: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyHmac).forRoutes('*');
  }
}
