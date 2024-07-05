import '@shopify/shopify-api/adapters/node';
import { ShopifyConfig } from '@config/shopify.config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiVersion,
  BeginParams,
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
    console.log(req.query.shop);
    const beginParams: BeginParams = {
      shop: ShopifyAppInstallRepository.shopify.utils.sanitizeShop(
        <string>req.query.shop,
        true,
      ),
      callbackPath: '/api/v1/shopify/callback',
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    };
    console.log('begin params', beginParams);
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
      apiVersion: ApiVersion.July23,
      isEmbeddedApp: shopifyConfig.isEmbeddedApp,
      isCustomStoreApp: false,
    });
  }

  public finishAuth(
    req: Request,
    res: Response,
  ): Promise<{
    headers: any;
    // TODO add type from prisma
    session: any;
  }> {
    return ShopifyAppInstallRepository.shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });
  }
}
