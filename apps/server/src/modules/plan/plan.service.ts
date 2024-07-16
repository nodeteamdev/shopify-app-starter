import { Injectable, NotFoundException } from '@nestjs/common';
import { PlanRepository } from '@modules/plan/plan.repository';
import { PlanDto } from '@modules/plan/dtos/plan.dto';
import { PLAN_NOT_FOUND } from '@modules/common/constants/errors.constants';
import { Prisma } from '@prisma/client';

@Injectable()
export class PlanService {
  constructor(private readonly planRepository: PlanRepository) {}

  public create(data: Prisma.PlanCreateInput) {
    return this.planRepository.create(data);
  }

  public async getOne(id: string): Promise<PlanDto> {
    const plan = await this.planRepository.findOne(id);

    if (!plan) {
      throw new NotFoundException(PLAN_NOT_FOUND)
    }

    return plan;
  }
}
