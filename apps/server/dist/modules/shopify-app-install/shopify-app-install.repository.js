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
var ShopifyAppInstallRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopifyAppInstallRepository = void 0;
require("@shopify/shopify-api/adapters/node");
const common_1 = require("@nestjs/common");
const shopify_api_1 = require("@shopify/shopify-api");
const _2023_07_1 = require("@shopify/shopify-api/rest/admin/2023-07");
const config_1 = require("@nestjs/config");
let ShopifyAppInstallRepository = ShopifyAppInstallRepository_1 = class ShopifyAppInstallRepository {
    constructor(configService) {
        this.configService = configService;
        const shopifyConfig = this.configService.get('shopify');
        this.initShopifyApi(shopifyConfig);
    }
    beginAuth(req, res) {
        const beginParams = {
            shop: ShopifyAppInstallRepository_1.shopify.utils.sanitizeShop(req.query.shop, true),
            callbackPath: '/api/v1/shopify/callback',
            isOnline: false,
            rawRequest: req,
            rawResponse: res,
        };
        return ShopifyAppInstallRepository_1.shopify.auth.begin(beginParams);
    }
    initShopifyApi(shopifyConfig) {
        if (ShopifyAppInstallRepository_1.shopify !== null)
            return;
        ShopifyAppInstallRepository_1.shopify = (0, shopify_api_1.shopifyApi)({
            restResources: _2023_07_1.restResources,
            apiKey: shopifyConfig.apiKey,
            apiSecretKey: shopifyConfig.apiSecret,
            scopes: shopifyConfig.requiredScopes,
            hostName: shopifyConfig.hostName,
            apiVersion: shopify_api_1.ApiVersion.July23,
            isEmbeddedApp: false,
            isCustomStoreApp: false,
        });
    }
    finishAuth(req, res) {
        return ShopifyAppInstallRepository_1.shopify.auth.callback({
            rawRequest: req,
            rawResponse: res,
        });
    }
};
exports.ShopifyAppInstallRepository = ShopifyAppInstallRepository;
ShopifyAppInstallRepository.shopify = null;
exports.ShopifyAppInstallRepository = ShopifyAppInstallRepository = ShopifyAppInstallRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ShopifyAppInstallRepository);
//# sourceMappingURL=shopify-app-install.repository.js.map