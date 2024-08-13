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
import { Session } from '@shopify/shopify-api';

@Injectable()
export class OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public upsertMany(data: Prisma.OrderUpsertArgs[]): Promise<Order[]> {
    return this.prismaService.$transaction(
      data.map((d) => this.prismaService.order.upsert(d)),
    );
  }

  public findManyByShopId(shopId: string): Promise<Order[]> {
    return this.prismaService.order.findMany({ where: { shopId } });
  }

  public async getRecommendedProducts(
    query: GetRecommendationsDto,
  ): Promise<{ productId: string; countProducts: number; count: number }[]> {
    const { sortType, skip, limit } = query;

    let whereCond = 'WHERE 1=1';

    if (sortType === RecommendationTypesEnum.HOT) {
      whereCond += `AND "createdAt" > current_date - interval '30' day`;
    }

    return this.prismaService.$queryRaw(Prisma.sql`
      SELECT 
          item->>'productId' AS "productId",  
          COUNT(*)::int AS "countProducts",
        COUNT(*) OVER()::int AS count
      FROM orders
      JOIN UNNEST("lineItems") AS item ON true 
      ${Prisma.raw(whereCond)}
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
      new ShopifyAppInstallRepository.shopify.clients.Storefront({
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
