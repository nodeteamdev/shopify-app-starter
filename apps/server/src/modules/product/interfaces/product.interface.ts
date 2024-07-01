import { ProductStatusesEnum } from '@modules/product/enums/product-statuses.enum';

export interface Product {
  readonly legacyResourceId: string;
  readonly title: string;
  readonly createdAt: string;
  readonly status: ProductStatusesEnum;
  readonly priceRangeV2: {
    readonly maxVariantPrice: {
      readonly amount: string;
      readonly currencyCode: string;
    };
    readonly minVariantPrice: {
      readonly amount: string;
      readonly currencyCode: string;
    };
  };
  readonly productType: string | '';
  readonly featuredImage: {
    readonly url: string;
    readonly altText: string | null;
  } | null;
}
