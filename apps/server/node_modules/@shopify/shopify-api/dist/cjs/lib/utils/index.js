'use strict';

var shopValidator = require('./shop-validator.js');
var hmacValidator = require('./hmac-validator.js');
var versionCompatible = require('./version-compatible.js');
var shopAdminUrlHelper = require('./shop-admin-url-helper.js');

function shopifyUtils(config) {
    return {
        sanitizeShop: shopValidator.sanitizeShop(config),
        sanitizeHost: shopValidator.sanitizeHost(),
        validateHmac: hmacValidator.validateHmac(config),
        versionCompatible: versionCompatible.versionCompatible(config),
        versionPriorTo: versionCompatible.versionPriorTo(config),
        shopAdminUrlToLegacyUrl: shopAdminUrlHelper.shopAdminUrlToLegacyUrl,
        legacyUrlToShopAdminUrl: shopAdminUrlHelper.legacyUrlToShopAdminUrl,
    };
}

exports.shopifyUtils = shopifyUtils;
//# sourceMappingURL=index.js.map
