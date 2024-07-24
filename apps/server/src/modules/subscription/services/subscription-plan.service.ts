import { randomUUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionPlanStatusesEnum } from '@prisma/client';
import { SubscriptionPlanRepository } from '@modules/subscription/repositories/subscription-plan.repository';
import { CreateSubscriptionPlanDto } from '@modules/subscription/dtos/create-subscription-plan.dto';
import { SubscriptionPlanDto } from '@modules/subscription/dtos/subscription-plan.dto';
import { CreatedSubscriptionPlan } from '@modules/subscription/interfaces/created-subscription-plan.interface';
import { MappedSubscriptionPlan } from '@modules/subscription/interfaces/mapped-subscription-plan.interface';
import { SUBSCRIPTION_PLAN_NOT_FOUND } from '@modules/common/constants/errors.constants';

@Injectable()
export class SubscriptionPlanService {
  constructor(
    private readonly subscriptionPlanRepository: SubscriptionPlanRepository,
  ) {}

  private static mapSubscriptionPlan(
    createdSubscriptionPlan: CreatedSubscriptionPlan,
  ): MappedSubscriptionPlan {
    const { appSubscription: subscriptionPlan } = createdSubscriptionPlan;

    return {
      id: subscriptionPlan.id,
      name: subscriptionPlan.name,
      amount: +subscriptionPlan.lineItems.flatMap(
        (lineItem) => lineItem.plan.pricingDetails.price.amount,
      ),
      currencyCode: subscriptionPlan.lineItems
        .flatMap((lineItem) => lineItem.plan.pricingDetails.price.currencyCode)
        .toString(),
    };
  }

  public create(
    createSubscriptionPlanDto: CreateSubscriptionPlanDto,
  ): Promise<SubscriptionPlanDto> {
    return this.subscriptionPlanRepository.create({
      ...createSubscriptionPlanDto,
      id: randomUUID(),
      status: SubscriptionPlanStatusesEnum.ACTIVE,
    });
  }

  public getMany(): Promise<SubscriptionPlanDto[]> {
    return this.subscriptionPlanRepository.findMany();
  }

  public async getOne(id: string): Promise<SubscriptionPlanDto> {
    const subscriptionPlan = await this.subscriptionPlanRepository.findOne(id);

    if (!subscriptionPlan) {
      throw new NotFoundException(SUBSCRIPTION_PLAN_NOT_FOUND);
    }

    return subscriptionPlan;
  }

  public updateStatus(
    id: string,
    status: SubscriptionPlanStatusesEnum,
  ): Promise<SubscriptionPlanDto> {
    return this.subscriptionPlanRepository.updateStatus(id, status);
  }
}
