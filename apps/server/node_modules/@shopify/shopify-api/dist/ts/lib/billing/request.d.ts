import { ConfigInterface, ConfigParams } from '../base-types';
import { FutureFlagOptions } from '../../future/flags';
import { BillingRequestParams, BillingRequestResponse } from './types';
export declare function request<Config extends ConfigInterface<Params>, Params extends ConfigParams<any, Future>, Future extends FutureFlagOptions>(config: Config): <Params_1 extends BillingRequestParams>({ session, plan, isTest, returnUrl: returnUrlParam, returnObject, ...overrides }: Params_1) => Promise<BillingRequestResponse<Params_1>>;
//# sourceMappingURL=request.d.ts.map