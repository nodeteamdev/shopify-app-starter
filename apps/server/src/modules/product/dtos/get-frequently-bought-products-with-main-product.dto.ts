import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class FrequentlyBoughtProducts {
  @ApiProperty({ type: String, example: '8726990422234' })
  readonly productId: string;

  @ApiProperty({ type: Number, example: 3 })
  readonly count: number;
}

export class GetFrequentlyBoughtProductsWithMainProduct {
  @ApiProperty({ type: String, example: '8726990749914' })
  readonly mainProductId: string;

  @ApiProperty({ type: FrequentlyBoughtProducts, isArray: true })
  @Type(() => FrequentlyBoughtProducts)
  readonly products: FrequentlyBoughtProducts[];
}
