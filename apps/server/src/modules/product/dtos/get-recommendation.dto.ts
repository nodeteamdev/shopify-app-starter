import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { RecommendationTypesEnum } from '@modules/product/enums/recommendation-type.enum';
import { Type } from 'class-transformer';

export class GetRecommendationsDto {
  @ApiProperty({
    type: Number,
    default: 10,
    minimum: 1,
  })
  @IsNumber()
  @Type(() => Number)
  readonly limit: number = 10;

  @ApiProperty({
    type: Number,
    default: 0,
    minimum: 0,
  })
  @IsNumber()
  @Type(() => Number)
  readonly skip: number = 0;

  @ApiProperty({ enum: RecommendationTypesEnum })
  @IsEnum(RecommendationTypesEnum)
  readonly sortType: RecommendationTypesEnum;
}
