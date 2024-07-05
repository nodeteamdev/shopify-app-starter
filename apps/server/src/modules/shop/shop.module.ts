import { Module } from '@nestjs/common';
import { ShopService } from '@modules/shop/shop.service';
import { ShopRepository } from '@modules/shop/shop.repository';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';
import { PrismaModule } from '@modules/common/providers/prisma';

@Module({
  imports: [PrismaModule, ShopifyAppInstallModule],
  providers: [ShopService, ShopRepository],
  exports: [ShopService]
})
export class ShopModule {}
