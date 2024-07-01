
import { GraphqlForwardPaginationPageInfo } from '@modules/product/interfaces/graphql-page-info.interface';
import { Product } from '@modules/product/interfaces/product.interface';

export interface ProductsWithPageInfo {
  readonly products: {
    readonly nodes: Product[];
    readonly pageInfo: GraphqlForwardPaginationPageInfo;
  };
}
