"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopifyAuthModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../common/providers/prisma");
const shopify_auth_service_1 = require("./services/shopify-auth.service");
const shopify_auth_controller_1 = require("./shopify-auth.controller");
const shopify_app_install_module_1 = require("../shopify-app-install/shopify-app-install.module");
const shopify_active_store_repository_1 = require("./repositories/shopify-active-store.repository");
const shopify_auth_redirect_service_1 = require("./services/shopify-auth-redirect.service");
const shopify_session_repository_1 = require("./repositories/shopify-session.repository");
const shopify_session_service_1 = require("./services/shopify-session.service");
let ShopifyAuthModule = class ShopifyAuthModule {
};
exports.ShopifyAuthModule = ShopifyAuthModule;
exports.ShopifyAuthModule = ShopifyAuthModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_1.PrismaModule, shopify_app_install_module_1.ShopifyAppInstallModule, shopify_app_install_module_1.ShopifyAppInstallModule],
        providers: [
            shopify_auth_service_1.ShopifyAuthService,
            shopify_active_store_repository_1.ShopifyAuthActiveStoreRepository,
            shopify_auth_redirect_service_1.ShopifyAuthRedirectService,
            shopify_session_repository_1.ShopifyAuthSessionRepository,
            shopify_session_service_1.ShopifyAuthSessionService,
            shopify_auth_redirect_service_1.ShopifyAuthRedirectService,
        ],
        controllers: [shopify_auth_controller_1.ShopifyAuthController]
    })
], ShopifyAuthModule);
//# sourceMappingURL=shopify-auth.module.js.map