import { ApiProperty } from '@nestjs/swagger';
import { GraphqlForwardPaginationPageInfoDto } from '@modules/product/dtos/graphql-forward-pagination.dto';
import { ProductVariantDto } from '@modules/product/dtos/product-variant.dto';

export class ProductVariantsDto {
  @ApiProperty({ type: GraphqlForwardPaginationPageInfoDto })
  readonly pageInfo: GraphqlForwardPaginationPageInfoDto;

  @ApiProperty({ type: ProductVariantDto, isArray: true })
  readonly productVariants: ProductVariantDto[];
}
