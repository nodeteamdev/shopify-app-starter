/// <reference types="cookie-parser" />
import { Request, Response } from "express";
import { ConfigService } from "@nestjs/config";
export declare class ShopifyAuthRedirectService {
    private readonly configService;
    constructor(configService: ConfigService);
    redirect(req: Request, res: Response): Promise<void>;
}
