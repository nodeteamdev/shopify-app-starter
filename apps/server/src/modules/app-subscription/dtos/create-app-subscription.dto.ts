import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsISO4217CurrencyCode,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateAppSubscriptionDto {
  @ApiProperty({ type: String, example: 'Super Recurring Plan' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    type: String,
    example: 'http://super-recurring-plan.shopifyapps.com/',
  })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  readonly returnUrl: string;

  @ApiProperty({ type: Number, example: 10 })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  readonly amount: number;

  @ApiProperty({ type: String, example: 'USD' })
  @IsString()
  @IsISO4217CurrencyCode()
  @IsNotEmpty()
  readonly currencyCode: string;
}
