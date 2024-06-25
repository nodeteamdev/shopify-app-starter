import { ConfigInterface } from '../base-types';
export declare function shopifySession(config: ConfigInterface): {
    customAppSession: (shop: string) => import("./session").Session;
    getCurrentId: ({ isOnline, ...adapterArgs }: import("./types").GetCurrentSessionIdParams) => Promise<string | undefined>;
    getOfflineId: (shop: string) => string;
    getJwtSessionId: (shop: string, userId: string) => string;
    decodeSessionToken: (token: string, { checkAudience }?: import("./decode-session-token").DecodeSessionTokenOptions) => Promise<import("./types").JwtPayload>;
};
export type ShopifySession = ReturnType<typeof shopifySession>;
//# sourceMappingURL=index.d.ts.map