import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { OrderRepository } from '@modules/order/order.repository';
import { OrderDto } from '@modules/order/dtos/order.dto';
import { ShopService } from '@modules/shop/shop.service';
import { PaginationQueryDto } from '@modules/common/dtos/pagination-query.dto';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';
import { GetRecommendationsDto } from '@modules/product/dtos/get-recommendation.dto';
import { GetProductNode } from '@modules/product/interfaces/get-products.interface';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly shopService: ShopService,
    private readonly shopifyAuthSessionService: ShopifyAuthSessionService,
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

  public async findManyByShopId(
    shopId: string,
    paginationQueryDto: PaginationQueryDto,
  ): Promise<PaginatorTypes.PaginatedResult<OrderDto[]>> {
    const orders = await this.orderRepository.findManyByShopId(
      shopId,
      paginationQueryDto,
    );

    return {
      data: orders.data,
      meta: orders.meta,
    };
  }

  public async getProductRecommendations(
    shopName: string,
    query: GetRecommendationsDto,
  ): Promise<{ products: GetProductNode[]; count: number }> {
    const orders = await this.orderRepository.getRecommendedProducts(query);

    if (!orders || orders.length === 0) {
      return { products: [], count: 0 };
    }

    const shopifySession =
      await this.shopifyAuthSessionService.getShopifySessionByShopName(
        shopName,
      );

    const productsIds = orders.map((order) => order.productId);

    const products = await this.orderRepository.fetchProducts(
      shopifySession,
      productsIds,
      query.limit,
    );

    return { products: products, count: orders[0]?.count || 0 };
  }
}
