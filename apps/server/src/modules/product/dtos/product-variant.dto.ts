import { ApiProperty } from '@nestjs/swagger';

export class ProductVariantImageDto {
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
export class ProductVariantDto {
  @ApiProperty({ type: String, example: '8523536367741' })
  readonly id: string;

  @ApiProperty({ type: String, example: 'Red / Plastic / Test' })
  readonly title: string;

  @ApiProperty({ type: String, example: 'Some product Red / Plastic / Test' })
  readonly displayName: string;

  @ApiProperty({ type: String, example: '949.95' })
  readonly price: string;

  @ApiProperty({ type: String, example: 'Snowboard', nullable: true })
  readonly type: string | null;

  @ApiProperty({ type: ProductVariantImageDto })
  readonly image: ProductVariantImageDto;
}
