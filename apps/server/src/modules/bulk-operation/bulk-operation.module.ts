import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BulkOperationService } from '@modules/bulk-operation/bulk-operation.service';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';
import { ShopifyBulkOperationRepository } from '@modules/bulk-operation/shopify-bulk-operation.repository';
import { BulkOperationController } from '@modules/bulk-operation/bulk-operation.controller';

@Module({
  imports: [ShopifyAuthModule, HttpModule],
  controllers: [BulkOperationController],
  providers: [BulkOperationService, ShopifyBulkOperationRepository],
})
export class BulkOperationModule {}
