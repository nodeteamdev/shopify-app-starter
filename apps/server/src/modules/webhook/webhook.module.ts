import { VerifyHmac } from '@modules/common/middleware/verify-hmac.middleware';
import { PrismaModule } from '@modules/common/providers/prisma';
import { ShopifyModule } from '@modules/shopify-api/shopify.module';
import { WebhookRepository } from '@modules/webhook/webhook.repository';
import { WebhookService } from '@modules/webhook/webhook.service';
import { MiddlewareConsumer, Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, ShopifyModule],
  providers: [WebhookService, WebhookRepository],
  exports: [WebhookService],
})
export class WebhookModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyHmac).forRoutes('*');
  }
}
