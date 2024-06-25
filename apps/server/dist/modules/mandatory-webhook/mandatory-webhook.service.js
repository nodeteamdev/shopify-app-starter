"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MandatoryWebhookService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MandatoryWebhookService = void 0;
const node_crypto_1 = require("node:crypto");
const email_service_1 = require("../email/email.service");
const shopify_app_install_service_1 = require("../shopify-app-install/shopify-app-install.service");
const webhook_service_1 = require("../webhook/webhook.service");
const common_1 = require("@nestjs/common");
let MandatoryWebhookService = MandatoryWebhookService_1 = class MandatoryWebhookService {
    constructor(shopifyAppInstallService, webhookService, emailService) {
        this.shopifyAppInstallService = shopifyAppInstallService;
        this.webhookService = webhookService;
        this.emailService = emailService;
        this.logger = new common_1.Logger(MandatoryWebhookService_1.name);
    }
    async validateWebHook(req) {
        const { valid } = await this.shopifyAppInstallService.validateWebhook(req);
        this.logger.debug(`WebHook received for the topic: ${req?.headers['x-shopify-topic']}`);
        if (!valid) {
            throw new common_1.UnauthorizedException('Webhook is invalid');
        }
        if (!valid) {
            this.logger.error(`WebHook validation has failed for the WebHook with topic: ${req?.headers['x-shopify-topic']}`);
        }
        return valid;
    }
    handleCustomersDataRequestWebhook(req) {
        return this.handleWebhookRequest(req, this.emailService.sendCustomerDataRequest, 'Webhook for requesting customers data from the shop with id', 'An error occurs during requesting customers data from the shop with id');
    }
    handleCustomersRedactRequestWebhook(req) {
        return this.handleWebhookRequest(req, this.emailService.sendCustomerDataRequest, 'Webhook for requesting customers redact from the shop with id', 'An error occurs during requesting customers redact from the shop with id');
    }
    async handleUninstallAppWebhook(req) {
        const webhookId = req.headers['x-shopify-webhook-id'];
        if (await this.webhookService.isDuplicate(webhookId))
            return;
        const { id: shopId } = req.body;
        this.logger.debug(`Webhook for uninstalling app from the shop with id: ${shopId}. ${JSON.stringify({
            body: req.body,
            headers: req.headers,
        })}`);
        try {
            await this.uninstallApp(shopId);
            this.logger.debug(`App was successfully uninstalled from the shop with id: ${shopId}`);
            await this.saveWebhook(req);
        }
        catch (error) {
            this.logger.debug(`An error occurs during uninstalling app from the shop with id: ${shopId}: ${JSON.stringify({
                error,
            }, null, 2)}`);
        }
    }
    async handleWebhookRequest(req, emailServiceMethod, loggerInfo, loggerError) {
        const webhookId = req.headers['x-shopify-webhook-id'];
        const data = JSON.stringify({
            body: req.body,
            headers: req.headers,
        }, null, 2);
        if (await this.webhookService.isDuplicate(webhookId))
            return;
        const { id: shopId } = req.body;
        this.logger.debug(`${loggerInfo}: ${shopId}. ${JSON.stringify({
            body: req.body,
            headers: req.headers,
        })}`);
        try {
            await this.saveWebhook(req);
            await emailServiceMethod(data);
        }
        catch (error) {
            this.logger.debug(`${loggerError}: ${shopId}: ${JSON.stringify({
                error,
            }, null, 2)}`);
        }
    }
    saveWebhook(req) {
        return this.webhookService.create({
            id: (0, node_crypto_1.randomUUID)(),
            webhookId: req.headers['x-shopify-webhook-id']?.toString(),
            body: req.body,
            headers: req.headers,
            topic: req.headers['x-shopify-topic']?.toString(),
        });
    }
    validateWebhook(req) {
        return this.shopifyAppInstallService.validateWebhook(req);
    }
    async uninstallApp(shopId) {
        return;
    }
};
exports.MandatoryWebhookService = MandatoryWebhookService;
exports.MandatoryWebhookService = MandatoryWebhookService = MandatoryWebhookService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [shopify_app_install_service_1.ShopifyAppInstallService,
        webhook_service_1.WebhookService,
        email_service_1.EmailService])
], MandatoryWebhookService);
//# sourceMappingURL=mandatory-webhook.service.js.map