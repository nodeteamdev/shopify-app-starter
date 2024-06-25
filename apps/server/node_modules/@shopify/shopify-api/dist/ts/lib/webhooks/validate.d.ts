import { ConfigInterface } from '../base-types';
import { WebhookValidateParams, WebhookValidation } from './types';
export declare function validateFactory(config: ConfigInterface): ({ rawBody, ...adapterArgs }: WebhookValidateParams) => Promise<WebhookValidation>;
//# sourceMappingURL=validate.d.ts.map