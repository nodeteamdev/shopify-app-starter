import { AppSubscriptionStatusesEnum } from '@prisma/client';

export interface UserError {
  readonly field: string | null;
  readonly message: string;
}

interface Price {
  readonly amount: string;
  readonly currencyCode: string;
}

interface PricingDetails {
  readonly price: Price;
}

interface Plan {
  readonly pricingDetails: PricingDetails;
}

interface LineItem {
  readonly id: string;
  readonly plan: Plan;
}

interface AppSubscription {
  readonly id: string;
  readonly lineItems: LineItem[];
  readonly name: string;
  readonly returnUrl: string;
  readonly status: AppSubscriptionStatusesEnum;
}

export interface CreatedAppSubscription {
  readonly confirmationUrl: string;
  readonly appSubscription: AppSubscription;
  readonly userErrors: UserError[];
}
