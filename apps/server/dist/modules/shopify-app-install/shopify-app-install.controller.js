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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopifyAppInstallController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const shopify_app_install_service_1 = require("./shopify-app-install.service");
const config_1 = require("@nestjs/config");
const cookies_decorator_1 = require("../common/decorators/cookies.decorator");
let ShopifyAppInstallController = class ShopifyAppInstallController {
    constructor(shopifyAppInstallService, configService) {
        this.shopifyAppInstallService = shopifyAppInstallService;
        this.configService = configService;
    }
    async installApp(shop, { userId, webShopId }, req, res) {
        this.shopifyAppInstallService.validateHmac(req.query);
        const { session } = req.query;
        const { clientHost } = this.configService.get('app');
        if (shop && session) {
            common_1.Logger.log(`The app has been open for the shop: ${shop}. The request will be redirected to the host: ${clientHost}`);
            return res.redirect(`https://${clientHost}`);
        }
        common_1.Logger.debug(`Install app for shop: ${shop}, userId: ${userId || 'none'}, webShopId: ${webShopId || 'none'}`);
        await this.shopifyAppInstallService.beginAuth(req, res);
    }
};
exports.ShopifyAppInstallController = ShopifyAppInstallController;
__decorate([
    (0, common_1.Get)('/install'),
    __param(0, (0, common_1.Query)('shop')),
    __param(1, (0, cookies_decorator_1.Cookies)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ShopifyAppInstallController.prototype, "installApp", null);
exports.ShopifyAppInstallController = ShopifyAppInstallController = __decorate([
    (0, swagger_1.ApiTags)('Shopify'),
    (0, common_1.Controller)('shopify'),
    __metadata("design:paramtypes", [shopify_app_install_service_1.ShopifyAppInstallService,
        config_1.ConfigService])
], ShopifyAppInstallController);
//# sourceMappingURL=shopify-app-install.controller.js.map