import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class GetFrequentlyBoughtProductsQueryDto {
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
