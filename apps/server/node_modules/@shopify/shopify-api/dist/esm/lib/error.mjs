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

export { BillingError, BotActivityDetected, CookieNotFound, FeatureDeprecatedError, GraphqlQueryError, HttpInternalError, HttpMaxRetriesError, HttpRequestError, HttpResponseError, HttpRetriableError, HttpThrottlingError, InvalidDeliveryMethodError, InvalidHmacError, InvalidHostError, InvalidJwtError, InvalidOAuthError, InvalidRequestError, InvalidSession, InvalidShopError, InvalidWebhookError, MissingJwtTokenError, MissingRequiredArgument, MissingWebhookCallbackError, PrivateAppError, RestResourceError, SafeCompareError, SessionStorageError, ShopifyError, UnsupportedClientType };
//# sourceMappingURL=error.mjs.map
