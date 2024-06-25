import { AdapterArgs } from '../../runtime/http';
import { ConfigInterface } from '../base-types';
import { HashFormat } from '../../runtime/crypto/types';
import { AuthQuery } from '../auth/oauth/types';
import { ValidationInvalid, HmacValidationType, ValidationValid } from './types';
export type HMACSignator = 'admin' | 'appProxy';
export interface ValidateParams extends AdapterArgs {
    /**
     * The type of validation to perform, either 'flow' or 'webhook'.
     */
    type: HmacValidationType;
    /**
     * The raw body of the request.
     */
    rawBody: string;
}
export declare function generateLocalHmac(config: ConfigInterface): (params: AuthQuery, signator?: HMACSignator) => Promise<string>;
export declare function validateHmac(config: ConfigInterface): (query: AuthQuery, { signator }?: {
    signator: HMACSignator;
}) => Promise<boolean>;
export declare function validateHmacString(config: ConfigInterface, data: string, hmac: string, format: HashFormat): Promise<boolean>;
export declare function getCurrentTimeInSec(): number;
export declare function validateHmacFromRequestFactory(config: ConfigInterface): ({ type, rawBody, ...adapterArgs }: ValidateParams) => Promise<ValidationInvalid | ValidationValid>;
//# sourceMappingURL=hmac-validator.d.ts.map