import { Cursor } from '@modules/product/types/cursor-type';

export interface GraphqlForwardPaginationPageInfo {
  readonly endCursor: Cursor;
  readonly hasNextPage: boolean;
}
