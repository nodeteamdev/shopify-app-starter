import { Module } from '@nestjs/common';
import { ProductService } from '@modules/product/product.service';
import { ProductController } from '@modules/product/product.controller';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';
import { ShopifyProductRepository } from '@modules/product/shopify-product.repository';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';

@Module({
  imports: [ShopifyAppInstallModule, ShopifyAuthModule],
  providers: [ProductService, ShopifyProductRepository],
  controllers: [ProductController]
})
export class ProductModule {}
