import { GlobalIdType } from '@modules/shop/types/global-id.type';
import { GraphQlType } from '@modules/shop/types/graphql-type.type';

export const getGlobalId = (
  type: GraphQlType,
  id: string | number,
): GlobalIdType => `gid://shopify/${type}/${id}`;
