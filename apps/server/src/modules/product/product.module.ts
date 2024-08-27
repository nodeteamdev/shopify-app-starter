import { VerifyRequest } from '@modules/common/middleware/verify-request.middleware';
import { OrderModule } from '@modules/order/order.module';
import { ProductController } from '@modules/product/product.controller';
import { ProductService } from '@modules/product/product.service';
import { ShopifyProductRepository } from '@modules/product/shopify-product.repository';
import { ShopifyService } from '@modules/shopify-api/services/shopify.service';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

@Module({
  imports: [ShopifyAuthModule, OrderModule],
  providers: [ProductService, ShopifyProductRepository, ShopifyService],
  controllers: [ProductController],
})
export class ProductModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyRequest)
      .exclude(
        { path: 'v1/product/:shopName/products/recommendations', method: RequestMethod.GET },
      )
      .forRoutes(ProductController);
  }
}
