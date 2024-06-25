"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MandatoryWebhookModule = void 0;
const common_1 = require("@nestjs/common");
const mandatory_webhook_service_1 = require("./mandatory-webhook.service");
const mandatory_webhook_controller_1 = require("./mandatory-webhook.controller");
const email_module_1 = require("../email/email.module");
const webhook_module_1 = require("../webhook/webhook.module");
const shopify_app_install_module_1 = require("../shopify-app-install/shopify-app-install.module");
let MandatoryWebhookModule = class MandatoryWebhookModule {
};
exports.MandatoryWebhookModule = MandatoryWebhookModule;
exports.MandatoryWebhookModule = MandatoryWebhookModule = __decorate([
    (0, common_1.Module)({
        imports: [email_module_1.EmailModule, webhook_module_1.WebhookModule, shopify_app_install_module_1.ShopifyAppInstallModule],
        providers: [mandatory_webhook_service_1.MandatoryWebhookService],
        controllers: [mandatory_webhook_controller_1.MandatoryWebhookController],
        exports: [mandatory_webhook_service_1.MandatoryWebhookService]
    })
], MandatoryWebhookModule);
//# sourceMappingURL=mandatory-webhook.module.js.map