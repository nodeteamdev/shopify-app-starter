import { validateHmacFromRequestFactory } from '../utils/hmac-validator.mjs';
import { HmacValidationType } from '../utils/types.mjs';

function validateFactory(config) {
    return async function validate({ rawBody, ...adapterArgs }) {
        return validateHmacFromRequestFactory(config)({
            type: HmacValidationType.FulfillmentService,
            rawBody,
            ...adapterArgs,
        });
    };
}

export { validateFactory };
//# sourceMappingURL=validate.mjs.map
