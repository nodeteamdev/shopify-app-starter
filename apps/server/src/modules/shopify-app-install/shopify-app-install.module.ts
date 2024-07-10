import { Module } from '@nestjs/common';
import { ShopifyAppInstallController } from '@modules/shopify-app-install/shopify-app-install.controller';
import { ShopifyAppInstallService } from '@modules/shopify-app-install/shopify-app-install.service';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';
import { ShopModule } from '@modules/shop/shop.module';

@Module({
  imports: [ShopifyAuthModule, ShopModule],
  controllers: [ShopifyAppInstallController],
  providers: [ShopifyAppInstallService, ShopifyAppInstallRepository],
  exports: [ShopifyAppInstallService, ShopifyAppInstallRepository]
})
export class ShopifyAppInstallModule {}
