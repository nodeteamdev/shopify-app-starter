import { PrismaService } from '@modules/common/providers/prisma';
import { Injectable } from '@nestjs/common';
import {
  AppSubscription,
  AppSubscriptionStatusesEnum,
  Prisma,
  SubscriptionPlan,
  SubscriptionPlanStatusesEnum,
} from '@prisma/client';
import { UpdateStatuses } from '@modules/subscription/interfaces/update-statuses.interface';

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

  public updateStatus(
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

  public findOneByShopId(shopId: string): Promise<AppSubscription> {
    return this.prismaService.appSubscription.findFirst({ where: { shopId } });
  }

  public updateStatuses(
    data: UpdateStatuses,
  ): Promise<[AppSubscription, SubscriptionPlan]> {
    const {
      id,
      appSubscriptionStatus,
      subscriptionPlanId,
      subscriptionPlanStatus,
    } = data;

    return this.prismaService.$transaction([
      this.prismaService.appSubscription.update({
        where: { id },
        data: { status: appSubscriptionStatus },
      }),
      this.prismaService.subscriptionPlan.update({
        where: { id: subscriptionPlanId },
        data: { status: subscriptionPlanStatus },
      }),
    ]);
  }

  public findOneByShopName(shopName: string): Promise<AppSubscription> {
    return this.prismaService.appSubscription.findFirst({ where: { shop: { myshopifyDomain: shopName } } });
  }

  public deleteAndUpdateStatusTransaction(
    id: string,
    subscriptionPlanId: string,
  ): Promise<[AppSubscription, SubscriptionPlan]> {
    return this.prismaService.$transaction([
      this.prismaService.appSubscription.delete({ where: { id } }),
      this.prismaService.subscriptionPlan.update({
        where: { id: subscriptionPlanId },
        data: { status: SubscriptionPlanStatusesEnum.INACTIVE },
      })
    ])
  }
}
