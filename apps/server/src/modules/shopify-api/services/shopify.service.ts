import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LATEST_API_VERSION, shopifyApi } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2024-04';

@Injectable()
export class ShopifyService {
  constructor(private readonly configService: ConfigService) {}

  get shopifyApi() {
    const shopifyConfig = this.configService.getOrThrow('shopify');

    return shopifyApi({
      apiKey: shopifyConfig.apiKey,
      apiSecretKey: shopifyConfig.apiSecret,
      scopes: shopifyConfig.requiredScopes,
      hostName: shopifyConfig.shopifyRedirectUri.replace(/https:\/\//, ''),
      hostScheme: 'https',
      apiVersion: LATEST_API_VERSION,
      isEmbeddedApp: true,
      restResources,
      future: {
        lineItemBilling: true,
        customerAddressDefaultFix: true,
      },
    });
  }
}
