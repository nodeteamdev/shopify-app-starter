import { PrismaService } from "@modules/common/providers/prisma";
import { Session } from '@shopify/shopify-api';
import { Injectable } from "@nestjs/common";
import { Prisma, Session as ShopifySession } from "@prisma/client";

@Injectable()
export class ShopifyAuthSessionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public upsert(session: Session, encryptedContent: string): Promise<ShopifySession> {
    return this.prismaService.session.upsert({
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
    return this.prismaService.session.findUnique({
      where: { id },
    });
  }

  public findMany(id: string): Promise<ShopifySession[]> {
   return this.prismaService.session.findMany({
      where: { shop: id },
    });
  }

  public deleteMany(id: string): Promise<Prisma.BatchPayload> {
    return this.prismaService.session.deleteMany({ where: { id } });
  }
}