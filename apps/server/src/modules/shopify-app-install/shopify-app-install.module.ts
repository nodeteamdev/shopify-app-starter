import { VerifyHmac } from '@modules/common/middleware/verify-hmac.middleware';
import { ShopifyService } from '@modules/shopify-api/services/shopify.service';
import { ShopifyAppInstallController } from '@modules/shopify-app-install/shopify-app-install.controller';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { ShopifyAppInstallService } from '@modules/shopify-app-install/shopify-app-install.service';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppSubscriptionModule } from '@modules/app-subscription/app-subscription.module';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';
import { ShopModule } from '@modules/shop/shop.module';

@Module({
  imports: [ShopifyAuthModule, ShopModule, AppSubscriptionModule],
  controllers: [ShopifyAppInstallController],
  providers: [
    ShopifyAppInstallService,
    ShopifyAppInstallRepository,
    ShopifyService,
  ],
  exports: [ShopifyAppInstallService, ShopifyAppInstallRepository],
})
export class ShopifyAppInstallModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyHmac).forRoutes(ShopifyAppInstallController);
  }
}
