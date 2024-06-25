/// <reference types="cookie-parser" />
import { Request, Response } from 'express';
import { RawBodyRequest } from '@nestjs/common';
import { ShopifyAppInstallRepository } from '@modules/shopify-app-install/shopify-app-install.repository';
import { ShopifyRequestQuery } from '@modules/shopify-app-install/types/shopify-request-query-type';
import { WebhookValidation } from '@shopify/shopify-api';
export declare class ShopifyAppInstallService {
    private readonly shopifyAppInstallRepository;
    constructor(shopifyAppInstallRepository: ShopifyAppInstallRepository);
    validateHmac(queryParams: ShopifyRequestQuery): boolean;
    beginAuth(req: Request, res: Response): Promise<string>;
    validateWebhook(req: RawBodyRequest<Request>): Promise<WebhookValidation>;
    finishAuth(req: Request, res: Response): Promise<any>;
}
