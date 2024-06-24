import { PrismaService } from "@modules/common/providers/prisma";
import { Session } from '@shopify/shopify-api';
import { Injectable } from "@nestjs/common";
import { Prisma, ShopifySession } from "@prisma/client";

@Injectable()
export class ShopifySessionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public upsert(session: Session, encryptedContent: string): Promise<ShopifySession> {
    return this.prismaService.shopifySession.upsert({
      where: { id: session.id },
      update: {
        content: encryptedContent,
        shop: session.shop,
      },
      create: {
        id: session.id,
        content: encryptedContent,
        shop: session.shop,
      },
    });
  }

  public findUnique(id: string): Promise<ShopifySession | null> {
    return this.prismaService.shopifySession.findUnique({
      where: { id },
    });
  }

  public findMany(id: string): Promise<ShopifySession[]> {
   return this.prismaService.shopifySession.findMany({
      where: { shop: id },
    });
  }

  public deleteMany(id: string): Promise<Prisma.BatchPayload> {
    return this.prismaService.shopifySession.deleteMany({ where: { id } });
  }
}