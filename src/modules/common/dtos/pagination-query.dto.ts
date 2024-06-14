import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { DEFAULT_PAGINATION_LIMIT } from '@constants/pagination.constants';

export class PaginationQueryDto {
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  @IsOptional()
  @IsNumber()
  @Max(DEFAULT_PAGINATION_LIMIT)
  @ApiPropertyOptional({ type: Number, example: DEFAULT_PAGINATION_LIMIT })
  @Transform(({ value }) => Number(value))
  readonly perPage: number = DEFAULT_PAGINATION_LIMIT;

  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ type: Number, example: 1 })
  @Transform(({ value }) => Number(value))
  readonly page: number = 1;
}
