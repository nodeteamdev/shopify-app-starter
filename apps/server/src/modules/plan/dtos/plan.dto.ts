import { ApiProperty } from "@nestjs/swagger";
import { AppSubscriptionStatusesEnum, Plan } from "@prisma/client";

export class PlanDto implements Plan {
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

  @ApiProperty({ type: Date })
  readonly createdAt: Date;

  @ApiProperty({ type: Date })
  readonly updatedAt: Date;
}
