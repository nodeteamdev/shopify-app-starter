import { PrismaModule } from '@modules/common/providers/prisma';
import { ShopRepository } from '@modules/shop/repositories/shop.repository';
import { ShopifyShopRepository } from '@modules/shop/repositories/shopify-shop.repository';
import { ShopService } from '@modules/shop/shop.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  providers: [ShopService, ShopRepository, ShopifyShopRepository],
  exports: [ShopService],
})
export class ShopModule {}
