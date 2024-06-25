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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopifyAppInstallService = void 0;
const node_crypto_1 = require("node:crypto");
const common_1 = require("@nestjs/common");
const shopify_app_install_repository_1 = require("./shopify-app-install.repository");
let ShopifyAppInstallService = class ShopifyAppInstallService {
    constructor(shopifyAppInstallRepository) {
        this.shopifyAppInstallRepository = shopifyAppInstallRepository;
    }
    validateHmac(queryParams) {
        const sharedSecret = process.env.SHOPIFY_API_SECRET;
        const { hmac, ...rest } = queryParams;
        const message = Object.entries(rest)
            .map(([key, value]) => {
            let resultValue;
            if (Array.isArray(value)) {
                resultValue = value.join('&');
            }
            else {
                resultValue = value;
            }
            return `${key}=${resultValue}`;
        })
            .sort()
            .join('&');
        const calculatedHmac = (0, node_crypto_1.createHmac)('sha256', sharedSecret)
            .update(message)
            .digest('hex');
        if (calculatedHmac !== hmac) {
            throw new common_1.UnauthorizedException('Error');
        }
        return true;
    }
    beginAuth(req, res) {
        return this.shopifyAppInstallRepository.beginAuth(req, res);
    }
    validateWebhook(req) {
        return shopify_app_install_repository_1.ShopifyAppInstallRepository.shopify.webhooks.validate({
            rawBody: req?.rawBody?.toString() || '',
            rawRequest: req,
        });
    }
    finishAuth(req, res) {
        return this.shopifyAppInstallRepository.finishAuth(req, res);
    }
};
exports.ShopifyAppInstallService = ShopifyAppInstallService;
exports.ShopifyAppInstallService = ShopifyAppInstallService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [shopify_app_install_repository_1.ShopifyAppInstallRepository])
], ShopifyAppInstallService);
//# sourceMappingURL=shopify-app-install.service.js.map