import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetFrequentlyBoughtProductsQueryDto {
  @ApiProperty({
    type: [String],
    example: ['8726990749914', '8726990422234'],
  })
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsNotEmpty({ each: true })
  readonly mainProductIds: string[];

  @ApiProperty({
    type: Number,
    default: 10,
    minimum: 1,
    maximum: 20,
  })
  @IsNumber()
  @Min(1)
  @Max(20)
  @Type(() => Number)
  readonly take: number = 10;
}
