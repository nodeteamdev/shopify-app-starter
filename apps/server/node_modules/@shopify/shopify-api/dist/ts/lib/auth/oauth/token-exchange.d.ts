import { ConfigInterface } from '../../base-types';
import { Session } from '../../session/session';
export declare enum RequestedTokenType {
    OnlineAccessToken = "urn:shopify:params:oauth:token-type:online-access-token",
    OfflineAccessToken = "urn:shopify:params:oauth:token-type:offline-access-token"
}
export interface TokenExchangeParams {
    shop: string;
    sessionToken: string;
    requestedTokenType: RequestedTokenType;
}
export type TokenExchange = (params: TokenExchangeParams) => Promise<{
    session: Session;
}>;
export declare function tokenExchange(config: ConfigInterface): TokenExchange;
//# sourceMappingURL=token-exchange.d.ts.map