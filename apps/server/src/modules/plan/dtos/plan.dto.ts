import { ApiProperty } from "@nestjs/swagger";
import { SubscriptionPlan, SubscriptionPlanStatusesEnum } from "@prisma/client";

export class SubscriptionPlanDto implements SubscriptionPlan {
  @ApiProperty({
    type: String,
    example: 'gid://shopify/AppSubscription/28342550780',
  })
  readonly id: string;

  @ApiProperty({ type: String, example: 'Super Subscription' })
  readonly name: string;

  @ApiProperty({ type: String, example: 'description' })
  readonly description: string;

  @ApiProperty({ type: Number, example: 10 })
  readonly amount: number;

  @ApiProperty({ type: String, example: 'USD' })
  readonly currencyCode: string;

  @ApiProperty({
    enum: SubscriptionPlanStatusesEnum,
    example: SubscriptionPlanStatusesEnum.ACTIVE,
  })
  readonly status: SubscriptionPlanStatusesEnum;

  @ApiProperty({ type: Date })
  readonly createdAt: Date;

  @ApiProperty({ type: Date })
  readonly updatedAt: Date;
}
