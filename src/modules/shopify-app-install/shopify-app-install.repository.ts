import '@shopify/shopify-api/adapters/node';
import { Injectable } from "@nestjs/common";
import {
  shopifyApi,
  ApiVersion,
  Shopify,
  BeginParams,
} from '@shopify/shopify-api';
import { Request, Response } from 'express';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-07';
import { ConfigService } from '@nestjs/config';
import { ShopifyConfig } from '@config/shopify.config';

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
      callbackPath: '/api/v1/shopify/callback',
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
      apiVersion: ApiVersion.July23,
      isEmbeddedApp: false,
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
