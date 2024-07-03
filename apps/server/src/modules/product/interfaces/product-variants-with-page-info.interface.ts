

import { GraphqlForwardPaginationPageInfo } from '@modules/product/interfaces/graphql-page-info.interface';
import { ProductVariant } from '@modules/product/interfaces/product-variant.interface';

export interface ProductVariantsWithPageInfo {
  readonly productVariants: {
    readonly nodes: ProductVariant[];
    readonly pageInfo: GraphqlForwardPaginationPageInfo;
  };
}
