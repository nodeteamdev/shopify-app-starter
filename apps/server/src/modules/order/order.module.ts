import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from '@modules/order/order.service';
import { OrderRepository } from '@modules/order/order.repository';
import { PrismaModule } from '@modules/common/providers/prisma';
import { OrderController } from '@modules/order/order.controller';
import { ShopModule } from '@modules/shop/shop.module';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';

@Module({
  imports: [PrismaModule, ShopModule, forwardRef(() => ShopifyAuthModule)],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService],
})
export class OrderModule {}
