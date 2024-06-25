import { Session } from '../../session/session';
import { ConfigInterface } from '../../base-types';
import { AccessTokenResponse } from './types';
export declare function createSession({ config, accessTokenResponse, shop, state, }: {
    config: ConfigInterface;
    accessTokenResponse: AccessTokenResponse;
    shop: string;
    state: string;
}): Session;
//# sourceMappingURL=create-session.d.ts.map