/// <reference types="cookie-parser" />
import { Request, Response } from 'express';
import { ShopifyAppInstallService } from "@modules/shopify-app-install/shopify-app-install.service";
import { ConfigService } from "@nestjs/config";
import { CookiesType } from "@decorators/cookies.decorator";
export declare class ShopifyAppInstallController {
    private readonly shopifyAppInstallService;
    private readonly configService;
    constructor(shopifyAppInstallService: ShopifyAppInstallService, configService: ConfigService);
    installApp(shop: string, { userId, webShopId }: CookiesType, req: Request, res: Response): Promise<void>;
}
