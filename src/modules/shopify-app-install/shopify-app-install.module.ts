import { Module } from '@nestjs/common';
import { ShopifyAppInstallController } from './shopify-app-install.controller';
import { ShopifyAppInstallService } from './shopify-app-install.service';
import { ShopifyAppInstallRepository } from './shopify-app-install.repository';

@Module({
  controllers: [ShopifyAppInstallController],
  providers: [ShopifyAppInstallService, ShopifyAppInstallRepository],
  exports: [ShopifyAppInstallService]
})
export class ShopifyAppInstallModule {}
