import { AppSubscriptionStatusesEnum, SubscriptionPlanStatusesEnum } from "@prisma/client";

export interface UpdateStatuses {
  readonly id: string,
  readonly appSubscriptionStatus: AppSubscriptionStatusesEnum,
  readonly subscriptionPlanId: string;
  readonly subscriptionPlanStatus: SubscriptionPlanStatusesEnum,
}
