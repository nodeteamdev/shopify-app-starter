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
exports.ShopifyAuthController = void 0;
const common_1 = require("@nestjs/common");
const shopify_auth_service_1 = require("./services/shopify-auth.service");
const shopify_auth_redirect_service_1 = require("./services/shopify-auth-redirect.service");
let ShopifyAuthController = class ShopifyAuthController {
    constructor(shopifyAuthRedirectService, shopifyAuthService) {
        this.shopifyAuthRedirectService = shopifyAuthRedirectService;
        this.shopifyAuthService = shopifyAuthService;
    }
    authMiddleware(req, res) {
        return this.shopifyAuthRedirectService.redirect(req, res);
    }
    authOffline(req, res) {
        return this.shopifyAuthService.storeOfflineToken(req, res);
    }
    async authOnline(req, res) {
        const shop = await this.shopifyAuthService.storeOnlineToken(req, res);
        res.status(200).redirect(`/?shop=${shop}&host=${req.query.host}`);
    }
};
exports.ShopifyAuthController = ShopifyAuthController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShopifyAuthController.prototype, "authMiddleware", null);
__decorate([
    (0, common_1.Get)('/offline'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShopifyAuthController.prototype, "authOffline", null);
__decorate([
    (0, common_1.Get)('/online'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShopifyAuthController.prototype, "authOnline", null);
exports.ShopifyAuthController = ShopifyAuthController = __decorate([
    (0, common_1.Controller)('shopify-auth'),
    __metadata("design:paramtypes", [shopify_auth_redirect_service_1.ShopifyAuthRedirectService,
        shopify_auth_service_1.ShopifyAuthService])
], ShopifyAuthController);
//# sourceMappingURL=shopify-auth.controller.js.map