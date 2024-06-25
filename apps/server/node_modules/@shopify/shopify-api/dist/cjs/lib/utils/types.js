'use strict';

exports.HmacValidationType = void 0;
(function (HmacValidationType) {
    HmacValidationType["Flow"] = "flow";
    HmacValidationType["Webhook"] = "webhook";
    HmacValidationType["FulfillmentService"] = "fulfillment_service";
})(exports.HmacValidationType || (exports.HmacValidationType = {}));
const ValidationErrorReason = {
    MissingBody: 'missing_body',
    InvalidHmac: 'invalid_hmac',
    MissingHmac: 'missing_hmac',
};

exports.ValidationErrorReason = ValidationErrorReason;
//# sourceMappingURL=types.js.map
