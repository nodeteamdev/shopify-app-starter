import { ConfigInterface } from '../base-types';
import { JwtPayload } from './types';
export interface DecodeSessionTokenOptions {
    checkAudience?: boolean;
}
export declare function decodeSessionToken(config: ConfigInterface): (token: string, { checkAudience }?: DecodeSessionTokenOptions) => Promise<JwtPayload>;
//# sourceMappingURL=decode-session-token.d.ts.map