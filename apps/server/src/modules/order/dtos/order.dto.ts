import { ApiProperty } from '@nestjs/swagger';
import { Order, Prisma } from '@prisma/client';

export class OrderDto implements Order {
  @ApiProperty({ type: String, example: '5789856203004' })
  readonly id: string;

  @ApiProperty({ type: Date })
  readonly createdAt: Date;

  @ApiProperty({ type: Date })
  readonly updatedAt: Date;

  @ApiProperty({ type: [String], example: 'Discount code' })
  readonly discountCodes: string[];

  @ApiProperty({ type: String, example: 'USD' })
  readonly currencyCode: string;

  @ApiProperty({ type: String, example: 'PENDING' })
  readonly displayFinancialStatus: string;

  @ApiProperty()
  lineItems: Prisma.JsonValue[];

  @ApiProperty({ type: String, example: '70162710780' })
  readonly shopId: string;
}
