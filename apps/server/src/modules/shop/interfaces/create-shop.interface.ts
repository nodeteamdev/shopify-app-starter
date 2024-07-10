import { GlobalIdType } from '@modules/shop/types/global-id.type';

export interface CreateShop {
  readonly id: GlobalIdType;
  readonly name: string;
  readonly email: string;
  readonly contactEmail: string;
  readonly primaryDomain: string;
  readonly myshopifyDomain: string;
}
