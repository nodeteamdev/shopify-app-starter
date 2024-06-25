/// <reference types="cookie-parser" />
import { Request, Response } from 'express';
import { ShopifyAuthActiveStoreRepository } from '@modules/shopify-auth/repositories/shopify-active-store.repository';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-session.service';
export declare class ShopifyAuthService {
    private readonly shopifyAuthActiveStoreRepository;
    private readonly shopifyAuthSessionService;
    constructor(shopifyAuthActiveStoreRepository: ShopifyAuthActiveStoreRepository, shopifyAuthSessionService: ShopifyAuthSessionService);
    storeOfflineToken(req: Request, res: Response): Promise<void>;
    storeOnlineToken(req: Request, res: Response): Promise<string>;
}
