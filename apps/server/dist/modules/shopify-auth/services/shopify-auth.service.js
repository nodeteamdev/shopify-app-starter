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
exports.ShopifyAuthService = void 0;
const common_1 = require("@nestjs/common");
const shopify_active_store_repository_1 = require("../repositories/shopify-active-store.repository");
const shopify_session_service_1 = require("./shopify-session.service");
const shopify_app_install_repository_1 = require("../../shopify-app-install/shopify-app-install.repository");
let ShopifyAuthService = class ShopifyAuthService {
    constructor(shopifyAuthActiveStoreRepository, shopifyAuthSessionService) {
        this.shopifyAuthActiveStoreRepository = shopifyAuthActiveStoreRepository;
        this.shopifyAuthSessionService = shopifyAuthSessionService;
    }
    async storeOfflineToken(req, res) {
        const callbackResponse = await shopify_app_install_repository_1.ShopifyAppInstallRepository.shopify.auth.callback({
            rawRequest: req,
            rawResponse: res,
        });
        const { session } = callbackResponse;
        await this.shopifyAuthSessionService.storeSession(session);
        const webhookRegisterResponse = await shopify_app_install_repository_1.ShopifyAppInstallRepository.shopify.webhooks.register({
            session,
        });
        console.dir(webhookRegisterResponse, { depth: null });
        return await shopify_app_install_repository_1.ShopifyAppInstallRepository.shopify.auth.begin({
            shop: session.shop,
            callbackPath: '/api/v1/shopify-auth/online',
            isOnline: true,
            rawRequest: req,
            rawResponse: res,
        });
    }
    async storeOnlineToken(req, res) {
        const callbackResponse = await shopify_app_install_repository_1.ShopifyAppInstallRepository.shopify.auth.callback({
            rawRequest: req,
            rawResponse: res,
        });
        const { session } = callbackResponse;
        await this.shopifyAuthSessionService.storeSession(session);
        const { shop } = session;
        await this.shopifyAuthActiveStoreRepository.upsertShopifyActiveStore(shop);
        return shop;
    }
};
exports.ShopifyAuthService = ShopifyAuthService;
exports.ShopifyAuthService = ShopifyAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [shopify_active_store_repository_1.ShopifyAuthActiveStoreRepository,
        shopify_session_service_1.ShopifyAuthSessionService])
], ShopifyAuthService);
//# sourceMappingURL=shopify-auth.service.js.map