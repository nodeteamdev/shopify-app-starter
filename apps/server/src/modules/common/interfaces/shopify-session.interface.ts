import { Session } from '@shopify/shopify-api';

export interface ShopifySession extends Session {
  shopShopifyId: number;
}
