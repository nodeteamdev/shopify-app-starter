'use strict';

class ShopifyError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
class InvalidHmacError extends ShopifyError {
}
class InvalidShopError extends ShopifyError {
}
class InvalidHostError extends ShopifyError {
}
class InvalidJwtError extends ShopifyError {
}
class MissingJwtTokenError extends ShopifyError {
}
class InvalidDeliveryMethodError extends ShopifyError {
}
class SafeCompareError extends ShopifyError {
}
class PrivateAppError extends ShopifyError {
}
class HttpRequestError extends ShopifyError {
}
class HttpMaxRetriesError extends ShopifyError {
}
class HttpResponseError extends ShopifyError {
    response;
    constructor({ message, code, statusText, body, headers, }) {
        super(message);
        this.response = {
            code,
            statusText,
            body,
            headers,
        };
    }
}
class HttpRetriableError extends HttpResponseError {
}
class HttpInternalError extends HttpRetriableError {
}
class HttpThrottlingError extends HttpRetriableError {
    constructor({ retryAfter, ...params }) {
        super(params);
        this.response.retryAfter = retryAfter;
    }
}
class RestResourceError extends ShopifyError {
}
class GraphqlQueryError extends ShopifyError {
    response;
    headers;
    body;
    constructor({ message, response, headers, body }) {
        super(message);
        this.response = response;
        this.headers = headers;
        this.body = body;
    }
}
class InvalidOAuthError extends ShopifyError {
}
class BotActivityDetected extends ShopifyError {
}
class CookieNotFound extends ShopifyError {
}
class InvalidSession extends ShopifyError {
}
class InvalidWebhookError extends ShopifyError {
    response;
    constructor({ message, response }) {
        super(message);
        this.response = response;
    }
}
class MissingWebhookCallbackError extends InvalidWebhookError {
}
class SessionStorageError extends ShopifyError {
}
class MissingRequiredArgument extends ShopifyError {
}
class UnsupportedClientType extends ShopifyError {
}
class InvalidRequestError extends ShopifyError {
}
class BillingError extends ShopifyError {
    errorData;
    constructor({ message, errorData }) {
        super(message);
        this.errorData = errorData;
    }
}
class FeatureDeprecatedError extends ShopifyError {
}

exports.BillingError = BillingError;
exports.BotActivityDetected = BotActivityDetected;
exports.CookieNotFound = CookieNotFound;
exports.FeatureDeprecatedError = FeatureDeprecatedError;
exports.GraphqlQueryError = GraphqlQueryError;
exports.HttpInternalError = HttpInternalError;
exports.HttpMaxRetriesError = HttpMaxRetriesError;
exports.HttpRequestError = HttpRequestError;
exports.HttpResponseError = HttpResponseError;
exports.HttpRetriableError = HttpRetriableError;
exports.HttpThrottlingError = HttpThrottlingError;
exports.InvalidDeliveryMethodError = InvalidDeliveryMethodError;
exports.InvalidHmacError = InvalidHmacError;
exports.InvalidHostError = InvalidHostError;
exports.InvalidJwtError = InvalidJwtError;
exports.InvalidOAuthError = InvalidOAuthError;
exports.InvalidRequestError = InvalidRequestError;
exports.InvalidSession = InvalidSession;
exports.InvalidShopError = InvalidShopError;
exports.InvalidWebhookError = InvalidWebhookError;
exports.MissingJwtTokenError = MissingJwtTokenError;
exports.MissingRequiredArgument = MissingRequiredArgument;
exports.MissingWebhookCallbackError = MissingWebhookCallbackError;
exports.PrivateAppError = PrivateAppError;
exports.RestResourceError = RestResourceError;
exports.SafeCompareError = SafeCompareError;
exports.SessionStorageError = SessionStorageError;
exports.ShopifyError = ShopifyError;
exports.UnsupportedClientType = UnsupportedClientType;
//# sourceMappingURL=error.js.map
