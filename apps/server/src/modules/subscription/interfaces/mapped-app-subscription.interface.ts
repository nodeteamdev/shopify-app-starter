import { AppSubscriptionStatusesEnum } from '@prisma/client';

export interface MappedAppSubscription {
  readonly id: string;
  readonly name: string;
  readonly confirmationUrl: string;
  readonly amount: number;
  readonly currencyCode: string;
  readonly status: AppSubscriptionStatusesEnum;
}
