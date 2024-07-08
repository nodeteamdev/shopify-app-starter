// eslint-disable-next-line max-classes-per-file
import { ApiProperty } from '@nestjs/swagger';
import { ProductStatusesEnum } from '@modules/product/enums/product-statuses.enum';

export class ProductVariantPriceDto {
  @ApiProperty({ type: String, example: '949.95' })
  readonly amount: string;

  @ApiProperty({ type: String, example: 'UAH' })
  readonly currencyCode: string;
}

export class ProductPriceDto {
  @ApiProperty({ type: ProductVariantPriceDto })
  readonly maxVariantPrice: ProductVariantPriceDto;

  @ApiProperty({ type: ProductVariantPriceDto })
  readonly minVariantPrice: ProductVariantPriceDto;
}

export class ProductImageDto {
  @ApiProperty({
    type: String,
    example:
      'https://cdn.shopify.com/s/files/1/0808/2604/0602/products/snowboard_purple_hydrogen.png?v=169263254',
    nullable: true,
  })
  readonly url: string | null;

  @ApiProperty({
    type: String,
    example: 'Top and bottom view of a snowboard',
    nullable: true,
  })
  readonly altText: string | null;
}

export class ProductDto {
  @ApiProperty({ type: String, example: '8523536367741' })
  readonly id: string;

  @ApiProperty({ type: String, example: 'Big Snowboard' })
  readonly title: string;

  @ApiProperty({ type: String, example: ProductStatusesEnum.ACTIVE })
  readonly status: ProductStatusesEnum;

  @ApiProperty({ type: String, example: 'Snowboard', nullable: true })
  readonly type: string | null;

  @ApiProperty({ type: ProductImageDto })
  readonly image: ProductImageDto;

  @ApiProperty({ type: ProductPriceDto })
  readonly price: ProductPriceDto;

  @ApiProperty({ type: String, example: '2023-08-14T10:59:02Z' })
  readonly createdAt: string;
}
