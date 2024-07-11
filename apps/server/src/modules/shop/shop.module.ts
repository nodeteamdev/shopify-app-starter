import { forwardRef, Module } from '@nestjs/common';
import { ShopService } from '@modules/shop/shop.service';
import { ShopRepository } from '@modules/shop/repositories/shop.repository';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';
import { PrismaModule } from '@modules/common/providers/prisma';
import { ShopifyShopRepository } from '@modules/shop/repositories/shopify-shop.repository';

@Module({
  imports: [PrismaModule, forwardRef(() => ShopifyAppInstallModule)],
  providers: [ShopService, ShopRepository, ShopifyShopRepository],
  exports: [ShopService]
})
export class ShopModule {}
