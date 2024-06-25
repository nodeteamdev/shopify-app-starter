'use strict';

var hmacValidator = require('../utils/hmac-validator.js');
var types = require('../utils/types.js');

function validateFactory(config) {
    return async function validate({ rawBody, ...adapterArgs }) {
        return hmacValidator.validateHmacFromRequestFactory(config)({
            type: types.HmacValidationType.FulfillmentService,
            rawBody,
            ...adapterArgs,
        });
    };
}

exports.validateFactory = validateFactory;
//# sourceMappingURL=validate.js.map
