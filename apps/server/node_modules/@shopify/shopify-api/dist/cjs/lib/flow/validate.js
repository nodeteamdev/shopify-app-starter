'use strict';

var types = require('../utils/types.js');
var hmacValidator = require('../utils/hmac-validator.js');

function validateFactory(config) {
    return async function validate({ rawBody, ...adapterArgs }) {
        return hmacValidator.validateHmacFromRequestFactory(config)({
            type: types.HmacValidationType.Flow,
            rawBody,
            ...adapterArgs,
        });
    };
}

exports.validateFactory = validateFactory;
//# sourceMappingURL=validate.js.map
