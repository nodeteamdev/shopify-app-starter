import { DEFAULT_PAGINATION_LIMIT } from '@constants/pagination.constants';
import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Cursor } from '@modules/product/types/cursor-type';
import { ProductSortKeysEnum } from '@modules/product/enums/product-sort-keys.enum';
import { ProductSortKeyType } from '@modules/product/types/product-sort-key.type';

export class ProductsQueryDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(1_000)
  @ApiPropertyOptional({
    name: 'after',
    required: false,
    description: 'The cursor of the first record in the products list',
  })
  readonly after: Cursor = null;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Max(DEFAULT_PAGINATION_LIMIT)
  @Transform(({ value }) => Number(value))
  @ApiPropertyOptional({
    name: 'first',
    required: false,
    description: `First is the limit of records that the API will return. The first has to be 
    ${DEFAULT_PAGINATION_LIMIT} or less. The first is an optional parameter. If the first is 
    omitted the API will return an array with ${DEFAULT_PAGINATION_LIMIT} models or less. If the first 
    is bigger than ${DEFAULT_PAGINATION_LIMIT} or empty or not a positive number 
    API will return 400 bad request`,
    example: DEFAULT_PAGINATION_LIMIT,
  })
  readonly first: number = DEFAULT_PAGINATION_LIMIT;

  @IsOptional()
  @IsNotEmpty()
  @IsIn([true, false])
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;

    return 'invalid value';
  })
  @ApiPropertyOptional({
    name: 'reverse',
    required: false,
    description: 'Reverse the order of the records list',
    example: true,
  })
  readonly reverse: boolean = null;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEnum(ProductSortKeysEnum)
  @ApiPropertyOptional({
    name: 'sortKey',
    required: false,
    description: 'Sort the records list by the given key',
    example: ProductSortKeysEnum.CREATED_AT,
    enum: ProductSortKeysEnum,
  })
  readonly sortKey: ProductSortKeyType = null;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  @ApiPropertyOptional({
    name: 'query',
    required: false,
    description: 'The search query string',
    example: 'Red Snowboard',
  })
  readonly query: string = null;
}
