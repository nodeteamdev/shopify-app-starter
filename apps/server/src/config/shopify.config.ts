import { validateScheme } from '@config/utils/scheme-validator.helper';
import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const scheme = z.object({
  apiKey: z.string(),
  apiSecret: z.string(),
  requiredScopes: z.array(z.string()),
  hostName: z.string(),
  shopifyRedirectUri: z.string(),
  encryptionString: z.string(),
  maxTries: z.number(),
  maxPaginationLimit: z.number(),
  appPurchaseOneTimeMinPrice: z.number(),
});

export type ShopifyConfig = {
  readonly apiKey: string;
  readonly apiSecret: string;
  readonly requiredScopes: string[];
  readonly hostName: string;
  readonly shopifyRedirectUri: string;
  readonly encryptionString: string;
  readonly maxTries: number;
  readonly maxPaginationLimit: number;
  readonly appPurchaseOneTimeMinPrice: number;
  readonly isEmbeddedApp: boolean;
};

export const shopifyConfig = registerAs('shopify', (): ShopifyConfig => {
  const config: ShopifyConfig = {
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecret: process.env.SHOPIFY_API_SECRET,
    requiredScopes: ['read_products', 'read_orders', 'write_discounts', 'read_product_listings'],
    hostName: process.env.API_HOST_NAME,
    shopifyRedirectUri: process.env.SHOPIFY_REDIRECT_URI,
    encryptionString: process.env.SHOPIFY_ENCRYPTION_STRING,
    maxTries: 100,
    maxPaginationLimit: 250,
    // The Shopify appPurchaseOneTimeCreate mutation trows an exception if price is less than $0.50
    appPurchaseOneTimeMinPrice: 0.5,
    isEmbeddedApp: process.env.SHOPIFY_IS_EMBEDDED_APP === 'true',
  };

  validateScheme(scheme, config, new Logger('ShopifyConfig'));

  return config;
});
