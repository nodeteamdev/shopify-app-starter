import { ValidationInvalid, ValidationValid, ValidateParams } from '../utils/types';
import { ConfigInterface } from '../base-types';
export declare function validateFactory(config: ConfigInterface): ({ rawBody, ...adapterArgs }: ValidateParams) => Promise<ValidationInvalid | ValidationValid>;
//# sourceMappingURL=validate.d.ts.map