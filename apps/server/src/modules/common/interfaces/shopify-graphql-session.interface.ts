import { ShopifySession } from '@interfaces/shopify-session.interface';
import { GraphqlClient } from '@shopify/shopify-api';

export interface ShopifyGraphqlSession {
  session: ShopifySession;
  client: GraphqlClient;
}
