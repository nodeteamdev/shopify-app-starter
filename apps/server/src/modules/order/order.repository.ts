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
import { Session } from '@shopify/shopify-api';
import { FindFrequentlyBoughtProductsWithMainProduct } from '@modules/order/interfaces/find-frequently-bought-products-with-main-product.interface';

const paginate: PaginatorTypes.PaginateFunction = paginator({
  perPage: DEFAULT_PAGINATION_LIMIT,
});

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

  public findFrequentlyBoughtProductsWithMainProduct(
    shopId: string,
    mainProductIds: string[],
    take: number,
  ): Promise<FindFrequentlyBoughtProductsWithMainProduct> {
    return this.prismaService.$queryRaw(Prisma.sql`
      WITH product_orders AS (
        SELECT
          o.id AS order_id,
          o."shopId",
          (line_item->>'productId') AS productId
        FROM
          orders o,
          LATERAL unnest(o."lineItems") AS line_item
        WHERE
          (line_item->>'productId') IS NOT NULL
      ),
      products AS (
        SELECT
          po1.productId AS main_product,
          po2.productId AS product,
          COUNT(*) AS product_count
        FROM
          product_orders po1
        JOIN
          product_orders po2
          ON po1.order_id = po2.order_id
          AND po1.productId <> po2.productId
        WHERE
          po1.productId = ANY (ARRAY[${mainProductIds}])
          AND po1."shopId" = ${shopId}
        GROUP BY
          po1.productId,
          po2.productId
      ),
      limited_products AS (
        SELECT
          main_product,
          product,
          product_count
        FROM (
          SELECT *,
            ROW_NUMBER() OVER (PARTITION BY main_product ORDER BY product_count DESC) AS row_num
          FROM
            products
        ) ranked
        WHERE
          row_num <= ${take}
      )
      SELECT
        main_product AS "mainProduct",
        json_agg(
          json_build_object(
            'productId', product,
            'count', product_count
          )
          ORDER BY product_count DESC
        ) AS "products"
      FROM
        limited_products
      GROUP BY
        main_product
    `);
  }
}
