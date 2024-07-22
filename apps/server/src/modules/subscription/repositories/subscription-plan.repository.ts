import { PrismaService } from '@modules/common/providers/prisma';
import { Injectable } from '@nestjs/common';
import { SubscriptionPlan, Prisma, SubscriptionPlanStatusesEnum } from '@prisma/client';

@Injectable()
export class SubscriptionPlanRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(data: Prisma.SubscriptionPlanCreateInput): Promise<SubscriptionPlan> {
    return this.prismaService.subscriptionPlan.create({ data });
  }

  public findOne(id: string): Promise<SubscriptionPlan | null> {
    return this.prismaService.subscriptionPlan.findUnique({ where: { id } });
  }

  public findMany(): Promise<SubscriptionPlan[]> {
    return this.prismaService.subscriptionPlan.findMany();
  }

  public updateStatus(id: string, status: SubscriptionPlanStatusesEnum): Promise<SubscriptionPlan> {
    return this.prismaService.subscriptionPlan.update({ where: { id }, data: { status } });
  }
}
