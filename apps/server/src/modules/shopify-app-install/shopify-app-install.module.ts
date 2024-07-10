import { forwardRef, Module } from '@nestjs/common';
import { ShopifyAppInstallController } from '@modules/shopify-app-install/shopify-app-install.controller';
import { ShopifyAppInstallService } from '@modules/shopify-app-install/shopify-app-install.service';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { AppSubscriptionModule } from '@modules/app-subscription/app-subscription.module';

@Module({
  imports: [forwardRef(() => AppSubscriptionModule)],
  controllers: [ShopifyAppInstallController],
  providers: [ShopifyAppInstallService, ShopifyAppInstallRepository],
  exports: [ShopifyAppInstallService, ShopifyAppInstallRepository]
})
export class ShopifyAppInstallModule {}
