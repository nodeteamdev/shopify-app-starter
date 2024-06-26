import { Injectable } from "@nestjs/common";
import { PrismaService } from "@modules/common/providers/prisma";
import { Store } from "@prisma/client";

@Injectable()
export class ShopifyAuthActiveStoreRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public upsertShopifyActiveStore(shopName: string, shopId: string): Promise<Store> {
    return this.prismaService.store.upsert({
      where: { shopName },
      update: { isActive: true },
      create: {
        shopId,
        shopName,
        isActive: true,
      }
    });
  }
}