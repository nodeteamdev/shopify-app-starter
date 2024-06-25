/// <reference types="cookie-parser" />
import '@shopify/shopify-api/adapters/node';
import { Shopify } from '@shopify/shopify-api';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ShopifyConfig } from '@config/shopify.config';
export declare class ShopifyAppInstallRepository {
    private readonly configService;
    static shopify: Shopify;
    constructor(configService: ConfigService);
    beginAuth(req: Request, res: Response): Promise<string>;
    initShopifyApi(shopifyConfig: ShopifyConfig): void;
    finishAuth(req: Request, res: Response): Promise<{
        headers: any;
        session: any;
    }>;
}
