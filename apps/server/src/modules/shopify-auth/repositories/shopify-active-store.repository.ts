import { Injectable } from "@nestjs/common";
import { PrismaService } from "@modules/common/providers/prisma";
import { ShopifyAuthActiveStore } from "@prisma/client";

@Injectable()
export class ShopifyAuthActiveStoreRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public upsertShopifyActiveStore(shopName: string): Promise<ShopifyAuthActiveStore> {
    return this.prismaService.shopifyAuthActiveStore.upsert({
      where: { shopName },
      update: { isActive: true },
      create: {
        shopName,
        isActive: true,
      }
    });
  }
}