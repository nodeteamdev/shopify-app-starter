import { OrderModule } from '@modules/order/order.module';
import { ProductController } from '@modules/product/product.controller';
import { ProductService } from '@modules/product/product.service';
import { ShopifyProductRepository } from '@modules/product/shopify-product.repository';
import { ShopifyService } from '@modules/shopify-api/services/shopify.service';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ShopifyAuthModule, OrderModule],
  providers: [ProductService, ShopifyProductRepository, ShopifyService],
  controllers: [ProductController],
})
export class ProductModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(VerifyRequest).forRoutes(ProductController);
  // }
}
