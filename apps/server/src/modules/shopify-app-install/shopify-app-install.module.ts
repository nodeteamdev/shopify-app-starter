import { Module } from '@nestjs/common';
import { ShopifyAppInstallController } from '@modules/shopify-app-install/shopify-app-install.controller';
import { ShopifyAppInstallService } from '@modules/shopify-app-install/shopify-app-install.service';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { AppSubscriptionModule } from '@modules/app-subscription/app-subscription.module';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';
import { ShopModule } from '@modules/shop/shop.module';

@Module({
  imports: [ShopifyAuthModule, ShopModule, AppSubscriptionModule],
  controllers: [ShopifyAppInstallController],
  providers: [ShopifyAppInstallService, ShopifyAppInstallRepository],
  exports: [ShopifyAppInstallService, ShopifyAppInstallRepository],
})
export class ShopifyAppInstallModule {}
