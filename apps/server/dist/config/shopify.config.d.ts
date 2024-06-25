export type ShopifyConfig = {
    readonly apiKey: string;
    readonly apiSecret: string;
    readonly requiredScopes: string[];
    readonly hostName: string;
    readonly shopifyRedirectUri: string;
    readonly encryptionString: string;
    readonly maxTries: number;
    readonly maxPaginationLimit: number;
    readonly appPurchaseOneTimeMinPrice: number;
};
export declare const shopifyConfig: (() => ShopifyConfig) & import("@nestjs/config").ConfigFactoryKeyHost<ShopifyConfig>;
