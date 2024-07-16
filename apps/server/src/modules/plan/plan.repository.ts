import { PrismaService } from '@modules/common/providers/prisma';
import { Plan, Prisma } from '@prisma/client';

export class PlanRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(data: Prisma.PlanCreateInput): Promise<Plan> {
    return this.prismaService.plan.create({ data });
  }

  public findOne(id: string): Promise<Plan | null> {
    return this.prismaService.plan.findUnique({ where: { id } });
  }

  public findMany(): Promise<Plan[]> {
    return this.prismaService.plan.findMany();
  }
}
