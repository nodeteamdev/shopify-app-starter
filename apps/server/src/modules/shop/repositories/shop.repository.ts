import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/common/providers/prisma';
import { Prisma, Shop } from '@prisma/client';

@Injectable()
export class ShopRepository {
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
      },
    });
  }

  public findOne(id: string): Promise<Shop> {
    return this.prismaService.shop.findFirst({ where: { id } });
  }

  public update(id: string, data: Prisma.ShopUpdateInput): Promise<Shop> {
    return this.prismaService.shop.update({ where: { id }, data });
  }

  public delete(id: string): Promise<Shop> {
    return this.prismaService.shop.delete({ where: { id } });
  }

  public findOneByName(name: string): Promise<Shop> {
    return this.prismaService.shop.findFirst({ where: { name } });
  }
}
