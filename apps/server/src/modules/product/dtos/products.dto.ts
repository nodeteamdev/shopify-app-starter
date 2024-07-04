import { ApiProperty } from '@nestjs/swagger';
import { GraphqlForwardPaginationPageInfoDto } from '@modules/product/dtos/graphql-forward-pagination.dto';
import { ProductDto } from '@modules/product/dtos/product.dto';

export class ProductsDto {
  @ApiProperty({ type: GraphqlForwardPaginationPageInfoDto })
  readonly pageInfo: GraphqlForwardPaginationPageInfoDto;

  @ApiProperty({ type: ProductDto, isArray: true })
  readonly products: ProductDto[];
}
