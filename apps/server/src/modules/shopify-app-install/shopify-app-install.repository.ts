import '@shopify/shopify-api/adapters/node';
import { ShopifyConfig } from '@config/shopify.config';
import { WebhookConfig } from '@modules/shopify-app-install/interfaces/webhook-config.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  BeginParams,
  LATEST_API_VERSION,
  Session,
  Shopify,
  shopifyApi,
} from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-07';
import { Request, Response } from 'express';

@Injectable()
export class ShopifyAppInstallRepository {
  public static shopify: Shopify = null;

  constructor(private readonly configService: ConfigService) {
    const shopifyConfig = this.configService.get<ShopifyConfig>('shopify');

    this.initShopifyApi(shopifyConfig);
  }

  public beginAuth(req: Request, res: Response): Promise<string> {
    const beginParams: BeginParams = {
      shop: ShopifyAppInstallRepository.shopify.utils.sanitizeShop(
        <string>req.query.shop,
        true,
      ),
      callbackPath: '/api/v1/shopify-app-install/callback',
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    };

    return ShopifyAppInstallRepository.shopify.auth.begin(beginParams);
  }

  public initShopifyApi(shopifyConfig: ShopifyConfig): void {
    if (ShopifyAppInstallRepository.shopify !== null) return;

    ShopifyAppInstallRepository.shopify = shopifyApi({
      restResources,
      apiKey: shopifyConfig.apiKey,
      apiSecretKey: shopifyConfig.apiSecret,
      scopes: shopifyConfig.requiredScopes,
      hostName: shopifyConfig.hostName,
      apiVersion: LATEST_API_VERSION,
      isEmbeddedApp: shopifyConfig.isEmbeddedApp,
      isCustomStoreApp: false,
      future: {
        lineItemBilling: true,
        customerAddressDefaultFix: true,
      },
    });
  }

  public finishAuth(
    req: Request,
    res: Response,
  ): Promise<{ session: Session }> {
    return ShopifyAppInstallRepository.shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });
  }

  public async createWebHook(
    session: Session,
    webhookConfig: WebhookConfig,
    includeFields: string[] = null,
  ): Promise<void> {
    const client = new ShopifyAppInstallRepository.shopify.clients.Graphql({
      session: new Session(session),
    });

    const queryData = `
      #graphql
      mutation webhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) {
        webhookSubscriptionCreate(topic: $topic, webhookSubscription: $webhookSubscription) {
          webhookSubscription {
            id
            topic
            format
            includeFields
            endpoint {
              __typename
              ... on WebhookHttpEndpoint {
                callbackUrl
              }
            }
          }
        }
      }
    `;

    await client.query({
      data: {
        query: queryData,
        variables: {
          topic: webhookConfig.topic,
          webhookSubscription: {
            callbackUrl: webhookConfig.callbackUrl,
            format: 'JSON',
            includeFields,
          },
        },
      },
    });
  }
}
