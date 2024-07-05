import { Injectable } from "@nestjs/common";
import { PrismaService } from "@modules/common/providers/prisma";
import { Prisma, Shop } from "@prisma/client";

@Injectable()
export class ShopifyAuthShopRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public save(data: Prisma.ShopCreateInput): Promise<Shop> {
    return this.prismaService.shop.create({
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        contactEmail: data.contactEmail,
        myshopifyDomain: data.myshopifyDomain,
        primaryDomain: data.primaryDomain,
      }
    });
  }

  public findOne(name: string): Promise<Shop> {
    return this.prismaService.shop.findFirst({ where: { name } })
  }
}