import { ApiProperty } from '@nestjs/swagger';
import { 
  IsInt,
  IsISO4217CurrencyCode,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateSubscriptionPlanDto {
  @ApiProperty({ type: String, example: 'Plan1' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: Number, example: 10 })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  readonly amount: number;

  @ApiProperty({ type: String, example: 'USD' })
  @IsISO4217CurrencyCode()
  @IsNotEmpty()
  readonly currencyCode: string;
}
