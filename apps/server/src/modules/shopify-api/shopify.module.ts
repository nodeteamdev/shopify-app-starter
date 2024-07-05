import { ShopifyService } from '@modules/shopify-api/services/shopify.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [ShopifyService],
  exports: [ShopifyService],
})
export class ShopifyModule {}
