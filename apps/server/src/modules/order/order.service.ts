import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { OrderRepository } from '@modules/order/order.repository';
import { OrderDto } from '@modules/order/dtos/order.dto';
import { ShopService } from '@modules/shop/shop.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly shopService: ShopService,
  ) {}

  public upsertMany(shopId: string, orders: OrderDto[]): Promise<OrderDto[]> {
    return this.orderRepository.upsertMany(
      orders.map((order) => {
        const data: Prisma.OrderUpsertArgs = {
          where: {
            id: order.id,
          },
          create: {
            id: order.id,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            currencyCode: order.currencyCode,
            displayFinancialStatus: order.displayFinancialStatus,
            shop: { connect: { id: shopId } },
            lineItems: order.lineItems,
          },
          update: {
            currencyCode: order.currencyCode,
            displayFinancialStatus: order.displayFinancialStatus,
            createdAt: order.createdAt,
            lineItems: order.lineItems,
          },
        };

        return data;
      }),
    );
  }

  public async findManyByShopId(shopName: string): Promise<OrderDto[]> {
    const { id: shopId } =
      await this.shopService.findOneByPrimaryDomain(shopName);

    return this.orderRepository.findManyByShopId(shopId);
  }
}
