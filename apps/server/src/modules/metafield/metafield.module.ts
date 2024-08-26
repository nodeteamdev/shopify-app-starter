import { Module } from '@nestjs/common';
import { MetafieldService } from '@modules/metafield/metafield.service';
import { ShopifyMetafieldRepository } from '@modules/metafield/shopify-metafield.repository';

@Module({
  providers: [MetafieldService, ShopifyMetafieldRepository],
  exports: [MetafieldService],
})
export class MetafieldModule {}
