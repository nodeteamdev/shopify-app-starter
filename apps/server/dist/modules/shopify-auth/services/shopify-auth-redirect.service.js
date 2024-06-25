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
exports.ShopifyAuthRedirectService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const errors_constants_1 = require("../../common/constants/errors.constants");
const shopify_app_install_repository_1 = require("../../shopify-app-install/shopify-app-install.repository");
let ShopifyAuthRedirectService = class ShopifyAuthRedirectService {
    constructor(configService) {
        this.configService = configService;
    }
    async redirect(req, res) {
        const { hostName } = this.configService.get('shopify');
        if (!req.query.shop) {
            throw new common_1.NotFoundException(errors_constants_1.SHOP_NOT_FOUND);
        }
        const shop = shopify_app_install_repository_1.ShopifyAppInstallRepository.shopify.utils.sanitizeShop(req.query.shop);
        if (req.query.embedded === '1') {
            const queryParams = new URLSearchParams({
                ...req.query,
                shop,
                redirectUri: `https://${hostName}/api/v1/shopify-auth?shop=${shop}&host=${req.query.host}`,
            }).toString();
            return res.redirect(`/exitframe?${queryParams}`);
        }
        return shopify_app_install_repository_1.ShopifyAppInstallRepository.shopify.auth.begin({
            shop,
            callbackPath: '/api/v1/shopify-auth/offline',
            isOnline: false,
            rawRequest: req,
            rawResponse: res,
        });
    }
};
exports.ShopifyAuthRedirectService = ShopifyAuthRedirectService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShopifyAuthRedirectService.prototype, "redirect", null);
exports.ShopifyAuthRedirectService = ShopifyAuthRedirectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ShopifyAuthRedirectService);
//# sourceMappingURL=shopify-auth-redirect.service.js.map