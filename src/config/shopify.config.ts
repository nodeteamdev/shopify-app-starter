import { registerAs } from '@nestjs/config';

export type ShopifyConfig = {
  readonly apiKey: string;
  readonly apiSecret: string;
  readonly requiredScopes: string[];
  readonly hostName: string;
  readonly maxTries: number;
  readonly maxPaginationLimit: number;
  readonly appPurchaseOneTimeMinPrice: number;
};

export default registerAs(
  'shopify',
  (): ShopifyConfig => ({
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecret: process.env.SHOPIFY_API_SECRET,
    requiredScopes: ['read_products', 'read_orders', 'write_discounts'],
    hostName: process.env.API_HOST_NAME,
    maxTries: 100,
    maxPaginationLimit: 250,
    // The Shopify appPurchaseOneTimeCreate mutation trows an exception if price is less than $0.50
    appPurchaseOneTimeMinPrice: 0.5,
  }),
);
