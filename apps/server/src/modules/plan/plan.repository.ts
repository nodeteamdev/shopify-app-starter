import { PrismaService } from '@modules/common/providers/prisma';
import { SubscriptionPlan, Prisma } from '@prisma/client';

export class PlanRepository {
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
}
