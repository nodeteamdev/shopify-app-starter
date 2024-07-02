import { Module } from '@nestjs/common';
import { ShopifyAppInstallController } from '@modules/shopify-app-install/shopify-app-install.controller';
import { ShopifyAppInstallService } from '@modules/shopify-app-install/shopify-app-install.service';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';

@Module({
  controllers: [ShopifyAppInstallController],
  providers: [ShopifyAppInstallService, ShopifyAppInstallRepository],
  exports: [ShopifyAppInstallService, ShopifyAppInstallRepository]
})
export class ShopifyAppInstallModule {}
