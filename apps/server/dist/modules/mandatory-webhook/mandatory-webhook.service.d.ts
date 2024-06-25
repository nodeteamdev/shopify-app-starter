/// <reference types="cookie-parser" />
import { EmailService } from '@modules/email/email.service';
import { ShopifyAppInstallService } from '@modules/shopify-app-install/shopify-app-install.service';
import { WebhookService } from '@modules/webhook/webhook.service';
import { RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
export declare class MandatoryWebhookService {
    private readonly shopifyAppInstallService;
    private readonly webhookService;
    private readonly emailService;
    private readonly logger;
    constructor(shopifyAppInstallService: ShopifyAppInstallService, webhookService: WebhookService, emailService: EmailService);
    validateWebHook(req: RawBodyRequest<Request>): Promise<boolean>;
    handleCustomersDataRequestWebhook(req: RawBodyRequest<Request>): Promise<void>;
    handleCustomersRedactRequestWebhook(req: RawBodyRequest<Request>): Promise<void>;
    handleUninstallAppWebhook(req: RawBodyRequest<Request>): Promise<void>;
    private handleWebhookRequest;
    private saveWebhook;
    validateWebhook(req: RawBodyRequest<Request>): Promise<any>;
    uninstallApp(shopId: string): Promise<void>;
}
