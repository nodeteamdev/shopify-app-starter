import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BulkOperationService } from '@modules/bulk-operation/bulk-operation.service';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';
import { ShopifyBulkOperationRepository } from '@modules/bulk-operation/shopify-bulk-operation.repository';
import { BulkOperationController } from '@modules/bulk-operation/bulk-operation.controller';
import { OrderModule } from '@modules/order/order.module';
import { ShopModule } from '@modules/shop/shop.module';

@Module({
  imports: [
    forwardRef(() => ShopifyAuthModule),
    HttpModule,
    OrderModule,
    ShopModule,
  ],
  controllers: [BulkOperationController],
  providers: [BulkOperationService, ShopifyBulkOperationRepository],
  exports: [BulkOperationService],
})
export class BulkOperationModule {}
