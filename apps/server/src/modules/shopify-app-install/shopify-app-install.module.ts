import { AppSubscriptionModule } from '@modules/app-subscription/app-subscription.module';
import { ShopModule } from '@modules/shop/shop.module';
import { ShopifyService } from '@modules/shopify-api/services/shopify.service';
import { ShopifyAppInstallController } from '@modules/shopify-app-install/shopify-app-install.controller';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { ShopifyAppInstallService } from '@modules/shopify-app-install/shopify-app-install.service';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [
    ShopifyAuthModule,
    ShopModule,
    forwardRef(() => AppSubscriptionModule),
  ],
  controllers: [ShopifyAppInstallController],
  providers: [
    ShopifyAppInstallService,
    ShopifyAppInstallRepository,
    ShopifyService,
  ],
  exports: [ShopifyAppInstallService, ShopifyAppInstallRepository],
})
export class ShopifyAppInstallModule {}
