import { PrismaService } from "@modules/common/providers/prisma";
import { Session } from '@shopify/shopify-api';
import { Injectable } from "@nestjs/common";
import { Prisma, ShopifyAuthSession } from "@prisma/client";

@Injectable()
export class ShopifyAuthSessionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public upsert(session: Session, encryptedContent: string): Promise<ShopifyAuthSession> {
    return this.prismaService.shopifyAuthSession.upsert({
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

  public findUnique(id: string): Promise<ShopifyAuthSession | null> {
    return this.prismaService.shopifyAuthSession.findUnique({
      where: { id },
    });
  }

  public findMany(id: string): Promise<ShopifyAuthSession[]> {
   return this.prismaService.shopifyAuthSession.findMany({
      where: { shop: id },
    });
  }

  public deleteMany(id: string): Promise<Prisma.BatchPayload> {
    return this.prismaService.shopifyAuthSession.deleteMany({ where: { id } });
  }
}