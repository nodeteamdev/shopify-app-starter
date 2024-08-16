import { PrismaService } from '@modules/common/providers/prisma';
import { GetRecommendationsDto } from '@modules/product/dtos/get-recommendation.dto';
import { RecommendationTypesEnum } from '@modules/product/enums/recommendation-type.enum';
import {
  GetProductNode,
  GetProducts,
} from '@modules/product/interfaces/get-products.interface';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { paginator, PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { DEFAULT_PAGINATION_LIMIT } from '@modules/common/constants/pagination.constants';
import { PaginationQueryDto } from '@modules/common/dtos/pagination-query.dto';

const paginate: PaginatorTypes.PaginateFunction = paginator({
  perPage: DEFAULT_PAGINATION_LIMIT,
});
import { Session } from '@shopify/shopify-api';

@Injectable()
export class OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public upsertMany(data: Prisma.OrderUpsertArgs[]): Promise<Order[]> {
    return this.prismaService.$transaction(
      data.map((d) => this.prismaService.order.upsert(d)),
    );
  }

  public findManyByShopId(
    shopId: string,
    paginationQueryDto: PaginationQueryDto,
  ): Promise<PaginatorTypes.PaginatedResult<Order[]>> {
    return paginate(
      this.prismaService.order,
      {
        where: { shopId },
      },
      {
        ...paginationQueryDto,
      },
    );
  }

  public getRecommendedProducts(
    query: GetRecommendationsDto,
  ): Promise<{ productId: string; countProducts: number; count: number }[]> {
    const { sortType, skip, limit } = query;

    if (sortType === RecommendationTypesEnum.HOT) {
      return this.getHotRecommendations(query);
    }

    return this.prismaService.$queryRaw(Prisma.sql`
      SELECT
          item->>'productId' AS "productId",
          COUNT(*)::int AS "countProducts",
        COUNT(*) OVER()::int AS count
      FROM orders
      JOIN UNNEST("lineItems") AS item ON true
      GROUP BY "productId"
      ORDER BY "countProducts" DESC
      LIMIT '${Prisma.raw(String(limit))}'
      OFFSET '${Prisma.raw(String(skip))}'
    `);
  }

  private getHotRecommendations(
    query: GetRecommendationsDto,
  ): Promise<{ productId: string; countProducts: number; count: number }[]> {
    const { skip, limit } = query;

    return this.prismaService.$queryRaw(Prisma.sql`
      SELECT
          item->>'productId' AS "productId",
          COUNT(*)::int AS "countProducts",
        COUNT(*) OVER()::int AS count
      FROM orders
      JOIN UNNEST("lineItems") AS item ON true
      WHERE "createdAt" > current_date - interval '30' day
      GROUP BY "productId"
      ORDER BY "countProducts" DESC
      LIMIT '${Prisma.raw(String(limit))}'
      OFFSET '${Prisma.raw(String(skip))}'
    `);
  }

  public async fetchProducts(
    session: Session,
    productsIds: string[],
    limit: number,
  ): Promise<GetProductNode[]> {
    const storefrontClient =
      new ShopifyAppInstallRepository.shopify.clients.Graphql({
        session: new Session(session),
      });

    const query = productsIds
      .map((productId) => `id:${productId}`)
      .join(' OR ');

    const {
      body: {
        data: { products },
      },
    }: GetProducts = await storefrontClient.query({
      data: {
        query: `query products($first: Int!, $query: String!) {
          products(first: $first, query: $query) {
            edges {
              node {
                id
                title
                createdAt
                priceRangeV2 {
                    maxVariantPrice {
                      amount
                      currencyCode
                    }
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                }
                featuredImage {
                    url
                    altText
                }
              }
            }
          }
        }`,
        variables: {
          first: limit,
          query,
        },
      },
    });

    return products.edges.map((edge) => edge.node);
  }
}
