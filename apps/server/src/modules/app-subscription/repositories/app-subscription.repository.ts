import { PrismaService } from '@modules/common/providers/prisma';
import { Injectable } from '@nestjs/common';
import {
  AppSubscription,
  AppSubscriptionStatusesEnum,
  Prisma,
} from '@prisma/client';

@Injectable()
export class AppSubscriptionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(
    data: Prisma.AppSubscriptionCreateInput,
  ): Promise<AppSubscription> {
    return this.prismaService.appSubscription.create({ data });
  }

  public findOne(id: string): Promise<AppSubscription | null> {
    return this.prismaService.appSubscription.findFirst({ where: { id } });
  }

  public findManyByShopId(shopId: string): Promise<AppSubscription[]> {
    return this.prismaService.appSubscription.findMany({ where: { shopId } });
  }

  public update(
    id: string,
    status: AppSubscriptionStatusesEnum,
  ): Promise<AppSubscription> {
    return this.prismaService.appSubscription.update({
      where: { id },
      data: { status },
    });
  }

  public delete(id: string): Promise<AppSubscription> {
    return this.prismaService.appSubscription.delete({ where: { id } });
  }
}
