import { Module } from '@nestjs/common';
import { ProductService } from '@modules/product/product.service';
import { ProductController } from '@modules/product/product.controller';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';
import { ProductRepository } from '@modules/product/product.repository';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';

@Module({
  imports: [ShopifyAppInstallModule, ShopifyAuthModule],
  providers: [ProductService, ProductRepository],
  controllers: [ProductController]
})
export class ProductModule {}
