"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopifyAppInstallModule = void 0;
const common_1 = require("@nestjs/common");
const shopify_app_install_controller_1 = require("./shopify-app-install.controller");
const shopify_app_install_service_1 = require("./shopify-app-install.service");
const shopify_app_install_repository_1 = require("./shopify-app-install.repository");
let ShopifyAppInstallModule = class ShopifyAppInstallModule {
};
exports.ShopifyAppInstallModule = ShopifyAppInstallModule;
exports.ShopifyAppInstallModule = ShopifyAppInstallModule = __decorate([
    (0, common_1.Module)({
        controllers: [shopify_app_install_controller_1.ShopifyAppInstallController],
        providers: [shopify_app_install_service_1.ShopifyAppInstallService, shopify_app_install_repository_1.ShopifyAppInstallRepository],
        exports: [shopify_app_install_service_1.ShopifyAppInstallService, shopify_app_install_repository_1.ShopifyAppInstallRepository]
    })
], ShopifyAppInstallModule);
//# sourceMappingURL=shopify-app-install.module.js.map