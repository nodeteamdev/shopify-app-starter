import { Injectable } from "@nestjs/common";
import { PrismaService } from "@modules/common/providers/prisma";
import { Store } from "@prisma/client";

@Injectable()
export class ShopifyAuthStoreRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public save(shopName: string, shopId: string): Promise<Store> {
    return this.prismaService.store.create({
      data: {
        id: shopId,
        name: shopName,
      }
    });
  }

  public findOne(name: string): Promise<Store> {
    return this.prismaService.store.findFirst({ where: { name } })
  }
}