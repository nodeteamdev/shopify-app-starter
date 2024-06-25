"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopifyConfig = void 0;
const config_1 = require("@nestjs/config");
const scheme_validator_helper_1 = require("./utils/scheme-validator.helper");
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const scheme = zod_1.z.object({
    apiKey: zod_1.z.string(),
    apiSecret: zod_1.z.string(),
    requiredScopes: zod_1.z.array(zod_1.z.string()),
    hostName: zod_1.z.string(),
    shopifyRedirectUri: zod_1.z.string(),
    encryptionString: zod_1.z.string(),
    maxTries: zod_1.z.number(),
    maxPaginationLimit: zod_1.z.number(),
    appPurchaseOneTimeMinPrice: zod_1.z.number(),
});
exports.shopifyConfig = (0, config_1.registerAs)('shopify', () => {
    const config = {
        apiKey: process.env.SHOPIFY_API_KEY,
        apiSecret: process.env.SHOPIFY_API_SECRET,
        requiredScopes: ['read_products', 'read_orders', 'write_discounts'],
        hostName: process.env.API_HOST_NAME,
        shopifyRedirectUri: process.env.SHOPIFY_REDIRECT_URI,
        encryptionString: process.env.SHOPIFY_ENCRYPTION_STRING,
        maxTries: 100,
        maxPaginationLimit: 250,
        appPurchaseOneTimeMinPrice: 0.5,
    };
    (0, scheme_validator_helper_1.validateScheme)(scheme, config, new common_1.Logger('ShopifyConfig'));
    return config;
});
//# sourceMappingURL=shopify.config.js.map