import { PrismaService } from '@modules/common/providers/prisma';
import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';

@Injectable()
export class OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public upsertMany(data: Prisma.OrderUpsertArgs[]): Promise<Order[]> {
    return this.prismaService.$transaction(
      data.map((d) => this.prismaService.order.upsert(d)),
    );
  }

  public findManyByShopId(shopId: string): Promise<Order[]> {
    return this.prismaService.order.findMany({ where: { shopId } });
  }
}
