import { ProductController } from '@modules/product/product.controller';
import { ProductRepository } from '@modules/product/product.repository';
import { ProductService } from '@modules/product/product.service';
import { ShopifyService } from '@modules/shopify-api/services/shopify.service';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ShopifyAppInstallModule, ShopifyAuthModule],
  providers: [ProductService, ProductRepository, ShopifyService],
  controllers: [ProductController],
})
export class ProductModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(VerifyRequest).forRoutes(ProductController);
  // }
}
