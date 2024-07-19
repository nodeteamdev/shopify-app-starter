import { Injectable, NotFoundException } from '@nestjs/common';
import { PlanRepository } from '@modules/plan/plan.repository';
import { SubscriptionPlanDto } from '@modules/plan/dtos/plan.dto';
import { PLAN_NOT_FOUND } from '@modules/common/constants/errors.constants';
import { Prisma } from '@prisma/client';

@Injectable()
export class PlanService {
  constructor(private readonly planRepository: PlanRepository) {}

  public create(data: Prisma.SubscriptionPlanCreateInput) {
    return this.planRepository.create(data);
  }

  public async getOne(id: string): Promise<SubscriptionPlanDto> {
    const subscriptionPlan = await this.planRepository.findOne(id);

    if (!subscriptionPlan) {
      throw new NotFoundException(PLAN_NOT_FOUND);
    }

    return subscriptionPlan;
  }
}
