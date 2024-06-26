import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';

@Module({
  imports: [ShopifyAppInstallModule],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
