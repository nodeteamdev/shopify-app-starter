import { ShopifyService } from '@modules/shopify-api/services/shopify.service';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ShopifyAppInstallModule],
  providers: [ShopifyService],
  exports: [ShopifyService],
})
export class ShopifyModule {}
