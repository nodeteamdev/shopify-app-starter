import { GlobalIdType } from '@modules/shop/types/global-id.type';

export interface ShopInfo {
  readonly id: GlobalIdType;
  readonly name: string;
  readonly email: string;
  readonly contactEmail: string;
  readonly myshopifyDomain: string;
  readonly currencyCode: string;
  readonly primaryDomain: {
    readonly host: string;
  };
}