import { PrismaService } from '@modules/common/providers/prisma';
import { Session } from '@shopify/shopify-api';
import { Injectable } from '@nestjs/common';
import { Prisma, Session as ShopifySession } from '@prisma/client';

@Injectable()
export class ShopifyAuthSessionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public upsert(session: Session, shopId: string): Promise<ShopifySession> {
    return this.prismaService.session.upsert({
      where: { id: session.id },
      update: {
        content: JSON.stringify(session),
        shopName: session.shop,
      },
      create: {
        id: session.id,
        content: JSON.stringify(session),
        shopName: session.shop,
        shopId,
      },
    });
  }

  public findUnique(id: string): Promise<ShopifySession | null> {
    return this.prismaService.session.findUnique({
      where: { id },
    });
  }

  public findManyByShopName(shopName: string): Promise<ShopifySession[]> {
    return this.prismaService.session.findMany({
      where: { shopName },
    });
  }

  public findManyByShopId(shopId: string): Promise<ShopifySession[]> {
    return this.prismaService.session.findMany({
      where: { shopId },
    });
  }

  public deleteManyByShopName(shopName: string): Promise<Prisma.BatchPayload> {
    return this.prismaService.session.deleteMany({ where: { shopName } });
  }

  public deleteManyByShopId(shopId: string): Promise<Prisma.BatchPayload> {
    return this.prismaService.session.deleteMany({ where: { shopId } });
  }
}
