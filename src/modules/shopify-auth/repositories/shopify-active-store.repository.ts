import { PrismaService } from "@modules/common/providers/prisma";
import { Injectable } from "@nestjs/common";
import { ShopifyActiveStore } from "@prisma/client";

@Injectable()
export class ShopifyActiveStoreRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public upsertShopifyActiveStore(shop: string): Promise<ShopifyActiveStore> {
    return this.prismaService.shopifyActiveStore.upsert({
      where: { shop },
      update: { isActive: true },
      create: {
        shop,
        isActive: true,
      }
    });
  }
}