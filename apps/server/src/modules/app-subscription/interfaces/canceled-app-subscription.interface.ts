import { UserError } from '@modules/app-subscription/interfaces/created-app-subscription.interface';
import { AppSubscriptionStatusesEnum } from '@prisma/client';

interface AppSubscription {
  readonly id: string;
  readonly status: AppSubscriptionStatusesEnum;
}

export interface CanceledAppSubscription {
  readonly userErrors: UserError[];
  readonly appSubscription: AppSubscription;
}
