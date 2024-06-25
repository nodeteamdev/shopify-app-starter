import { HmacValidationType } from '../utils/types.mjs';
import { validateHmacFromRequestFactory } from '../utils/hmac-validator.mjs';

function validateFactory(config) {
    return async function validate({ rawBody, ...adapterArgs }) {
        return validateHmacFromRequestFactory(config)({
            type: HmacValidationType.Flow,
            rawBody,
            ...adapterArgs,
        });
    };
}

export { validateFactory };
//# sourceMappingURL=validate.mjs.map
