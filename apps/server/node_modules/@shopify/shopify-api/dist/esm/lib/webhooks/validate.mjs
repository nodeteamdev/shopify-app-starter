import { logger } from '../logger/index.mjs';
import { validateHmacFromRequestFactory } from '../utils/hmac-validator.mjs';
import { HmacValidationType, ValidationErrorReason } from '../utils/types.mjs';
import { abstractConvertRequest } from '../../runtime/http/index.mjs';
import { ShopifyHeader } from '../types.mjs';
import { WebhookValidationErrorReason } from './types.mjs';
import { topicForStorage } from './registry.mjs';
import { getHeader } from '../../runtime/http/headers.mjs';

const OPTIONAL_HANDLER_PROPERTIES = {
    subTopic: ShopifyHeader.SubTopic,
};
const HANDLER_PROPERTIES = {
    apiVersion: ShopifyHeader.ApiVersion,
    domain: ShopifyHeader.Domain,
    hmac: ShopifyHeader.Hmac,
    topic: ShopifyHeader.Topic,
    webhookId: ShopifyHeader.WebhookId,
    ...OPTIONAL_HANDLER_PROPERTIES,
};
function validateFactory(config) {
    return async function validate({ rawBody, ...adapterArgs }) {
        const request = await abstractConvertRequest(adapterArgs);
        const validHmacResult = await validateHmacFromRequestFactory(config)({
            type: HmacValidationType.Webhook,
            rawBody,
            ...adapterArgs,
        });
        if (!validHmacResult.valid) {
            if (validHmacResult.reason === ValidationErrorReason.InvalidHmac) {
                const log = logger(config);
                await log.debug("Webhook HMAC validation failed. Please note that events manually triggered from a store's Notifications settings will fail this validation. To test this, please use the CLI or trigger the actual event in a development store.");
            }
            return validHmacResult;
        }
        return checkWebhookHeaders(request.headers);
    };
}
function checkWebhookHeaders(headers) {
    const missingHeaders = [];
    const entries = Object.entries(HANDLER_PROPERTIES);
    const headerValues = entries.reduce((acc, [property, headerName]) => {
        const headerValue = getHeader(headers, headerName);
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
            reason: WebhookValidationErrorReason.MissingHeaders,
            missingHeaders,
        };
    }
    else {
        return {
            valid: true,
            ...headerValues,
            ...(headerValues.subTopic ? { subTopic: headerValues.subTopic } : {}),
            topic: topicForStorage(headerValues.topic),
        };
    }
}

export { validateFactory };
//# sourceMappingURL=validate.mjs.map
