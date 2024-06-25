import { ConfigInterface } from '../base-types';
import { shopAdminUrlToLegacyUrl, legacyUrlToShopAdminUrl } from './shop-admin-url-helper';
export declare function shopifyUtils(config: ConfigInterface): {
    sanitizeShop: (shop: string, throwOnInvalid?: boolean) => string | null;
    sanitizeHost: (host: string, throwOnInvalid?: boolean) => string | null;
    validateHmac: (query: import("..").AuthQuery, { signator }?: {
        signator: import("./hmac-validator").HMACSignator;
    }) => Promise<boolean>;
    versionCompatible: (referenceVersion: import("..").ApiVersion, currentVersion?: import("..").ApiVersion) => boolean;
    versionPriorTo: (referenceVersion: import("..").ApiVersion, currentVersion?: import("..").ApiVersion) => boolean;
    shopAdminUrlToLegacyUrl: typeof shopAdminUrlToLegacyUrl;
    legacyUrlToShopAdminUrl: typeof legacyUrlToShopAdminUrl;
};
export type ShopifyUtils = ReturnType<typeof shopifyUtils>;
//# sourceMappingURL=index.d.ts.map