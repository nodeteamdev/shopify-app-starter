import { ConfigInterface } from '../base-types';
import { ValidateParams, ValidationInvalid, ValidationValid } from '../utils/types';
export declare function validateFactory(config: ConfigInterface): ({ rawBody, ...adapterArgs }: ValidateParams) => Promise<ValidationInvalid | ValidationValid>;
//# sourceMappingURL=validate.d.ts.map