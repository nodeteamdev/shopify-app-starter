import { ApiProperty } from '@nestjs/swagger';
import { AppSubscription, AppSubscriptionStatusesEnum } from '@prisma/client';

export class AppSubscriptionDto implements AppSubscription {
  @ApiProperty({
    type: String,
    example: 'gid://shopify/AppSubscription/28342550780',
  })
  readonly id: string;

  @ApiProperty({ type: String, example: 'Super Subscription' })
  readonly name: string;

  @ApiProperty({ type: String, example: 'https://return-url.com/' })
  readonly returnUrl: string;

  @ApiProperty({ type: String, example: 'https://confirmation-url.com/' })
  readonly confirmationUrl: string;

  @ApiProperty({ type: Number, example: 10 })
  readonly amount: number;

  @ApiProperty({ type: String, example: 'USD' })
  readonly currencyCode: string;

  @ApiProperty({
    enum: AppSubscriptionStatusesEnum,
    example: AppSubscriptionStatusesEnum.ACTIVE,
  })
  readonly status: AppSubscriptionStatusesEnum;

  @ApiProperty({ type: String, example: '70162710780' })
  readonly shopId: string;

  @ApiProperty({ type: String, example: '28364472572' })
  readonly subscriptionPlanId: string;

  @ApiProperty({ type: Date })
  readonly createdAt: Date;

  @ApiProperty({ type: Date })
  readonly updatedAt: Date;
}
