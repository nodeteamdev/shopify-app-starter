/// <reference types="cookie-parser" />
import { Request, Response } from 'express';
import { ShopifyAuthService } from '@modules/shopify-auth/services/shopify-auth.service';
import { ShopifyAuthRedirectService } from '@modules/shopify-auth/services/shopify-auth-redirect.service';
export declare class ShopifyAuthController {
    private shopifyAuthRedirectService;
    private readonly shopifyAuthService;
    constructor(shopifyAuthRedirectService: ShopifyAuthRedirectService, shopifyAuthService: ShopifyAuthService);
    authMiddleware(req: Request, res: Response): Promise<void>;
    authOffline(req: Request, res: Response): Promise<void>;
    authOnline(req: Request, res: Response): Promise<void>;
}
