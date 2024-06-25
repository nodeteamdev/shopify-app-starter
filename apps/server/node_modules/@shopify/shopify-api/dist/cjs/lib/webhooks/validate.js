'use strict';

var index$1 = require('../logger/index.js');
var hmacValidator = require('../utils/hmac-validator.js');
var types$1 = require('../utils/types.js');
var index = require('../../runtime/http/index.js');
var types = require('../types.js');
var types$2 = require('./types.js');
var registry = require('./registry.js');
var headers = require('../../runtime/http/headers.js');

const OPTIONAL_HANDLER_PROPERTIES = {
    subTopic: types.ShopifyHeader.SubTopic,
};
const HANDLER_PROPERTIES = {
    apiVersion: types.ShopifyHeader.ApiVersion,
    domain: types.ShopifyHeader.Domain,
    hmac: types.ShopifyHeader.Hmac,
    topic: types.ShopifyHeader.Topic,
    webhookId: types.ShopifyHeader.WebhookId,
    ...OPTIONAL_HANDLER_PROPERTIES,
};
function validateFactory(config) {
    return async function validate({ rawBody, ...adapterArgs }) {
        const request = await index.abstractConvertRequest(adapterArgs);
        const validHmacResult = await hmacValidator.validateHmacFromRequestFactory(config)({
            type: types$1.HmacValidationType.Webhook,
            rawBody,
            ...adapterArgs,
        });
        if (!validHmacResult.valid) {
            if (validHmacResult.reason === types$1.ValidationErrorReason.InvalidHmac) {
                const log = index$1.logger(config);
                await log.debug("Webhook HMAC validation failed. Please note that events manually triggered from a store's Notifications settings will fail this validation. To test this, please use the CLI or trigger the actual event in a development store.");
            }
            return validHmacResult;
        }
        return checkWebhookHeaders(request.headers);
    };
}
function checkWebhookHeaders(headers$1) {
    const missingHeaders = [];
    const entries = Object.entries(HANDLER_PROPERTIES);
    const headerValues = entries.reduce((acc, [property, headerName]) => {
        const headerValue = headers.getHeader(headers$1, headerName);
        if (headerValue) {
            acc[property] = headerValue;
        }
        else if (!(property in OPTIONAL_HANDLER_PROPERTIES)) {
            missingHeaders.push(headerName);
        }
        return acc;
    }, {});
    if (missingHeaders.length) {
        return {
            valid: false,
            reason: types$2.WebhookValidationErrorReason.MissingHeaders,
            missingHeaders,
        };
    }
    else {
        return {
            valid: true,
            ...headerValues,
            ...(headerValues.subTopic ? { subTopic: headerValues.subTopic } : {}),
            topic: registry.topicForStorage(headerValues.topic),
        };
    }
}

exports.validateFactory = validateFactory;
//# sourceMappingURL=validate.js.map
