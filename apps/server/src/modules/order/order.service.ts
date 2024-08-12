import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { OrderRepository } from '@modules/order/order.repository';
import { OrderDto } from '@modules/order/dtos/order.dto';
import { ShopService } from '@modules/shop/shop.service';
import { PaginationQueryDto } from '@modules/common/dtos/pagination-query.dto';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';

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

  public async findManyByShopId(
    shopName: string,
    paginationQueryDto: PaginationQueryDto,
  ): Promise<PaginatorTypes.PaginatedResult<OrderDto[]>> {
    const { id: shopId } =
      await this.shopService.findOneByPrimaryDomain(shopName);

    const orders = await this.orderRepository.findManyByShopId(
      shopId,
      paginationQueryDto,
    );

    return {
      data: orders.data,
      meta: orders.meta,
    };
  }
}
