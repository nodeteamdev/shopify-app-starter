import { ConfigInterface } from '../../base-types';
import { Session } from '../../session/session';
import { AdapterResponse, AdapterHeaders } from '../../../runtime/http';
import { BeginParams, CallbackParams } from './types';
export type OAuthBegin = (beginParams: BeginParams) => Promise<AdapterResponse>;
export interface CallbackResponse<T = AdapterHeaders> {
    headers: T;
    session: Session;
}
export type OAuthCallback = <T = AdapterHeaders>(callbackParams: CallbackParams) => Promise<CallbackResponse<T>>;
export declare function begin(config: ConfigInterface): OAuthBegin;
export declare function callback(config: ConfigInterface): OAuthCallback;
//# sourceMappingURL=oauth.d.ts.map