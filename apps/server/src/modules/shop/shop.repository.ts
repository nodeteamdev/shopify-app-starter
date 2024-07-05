import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { Injectable } from '@nestjs/common';
import { RequestReturn, Session } from '@shopify/shopify-api';
import { GraphQlBody } from '@modules/shop/interfaces/graphql-body.interface';
import { ShopInfo } from '@modules/shop/interfaces/shop-info.interface';
import { PrismaService } from '@modules/common/providers/prisma';
import { Prisma, Shop } from '@prisma/client';

@Injectable()
export class ShopRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public findOne(id: string): Promise<Shop> {
    return this.prismaService.shop.findFirst({ where: { id } });
  }

  public update(id: string, data: Prisma.ShopUpdateInput): Promise<Shop> {
    return this.prismaService.shop.update({ where: { id }, data });
  }

  public delete(id: string): Promise<Shop> {
    return this.prismaService.shop.delete({ where: { id } });
  }

  public getShopInfo(
    session: Session,
  ): Promise<RequestReturn<GraphQlBody<{ readonly shop: ShopInfo }>>> {
    const client = new ShopifyAppInstallRepository.shopify.clients.Graphql({
      session: new Session(session),
    });

    const data = `
      {
        shop {
          id
          name
          email
          contactEmail
          currencyCode
          myshopifyDomain
          primaryDomain {
            host
          }
        }
      }
    `;

    return client.query({
      data,
    });
  }
}
