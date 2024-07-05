import '@shopify/shopify-api/adapters/node';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LATEST_API_VERSION, shopifyApi } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2024-01';

@Injectable()
export class ShopifyService {
  constructor(private configService: ConfigService) {}

  config = this.configService.get('shopify');

  private readonly shopifyApiInstance = shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    scopes: process.env.SHOPIFY_SCOPES.split(','),
    hostName: process.env.SHOPIFY_APP_URL.replace(/https:\/\//, ''),
    hostScheme: 'https',
    apiVersion: LATEST_API_VERSION,
    isEmbeddedApp: true,
    restResources,
  });

  get shopifyApi() {
    return this.shopifyApiInstance;
  }
}
