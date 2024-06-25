var HmacValidationType;
(function (HmacValidationType) {
    HmacValidationType["Flow"] = "flow";
    HmacValidationType["Webhook"] = "webhook";
    HmacValidationType["FulfillmentService"] = "fulfillment_service";
})(HmacValidationType || (HmacValidationType = {}));
const ValidationErrorReason = {
    MissingBody: 'missing_body',
    InvalidHmac: 'invalid_hmac',
    MissingHmac: 'missing_hmac',
};

export { HmacValidationType, ValidationErrorReason };
//# sourceMappingURL=types.mjs.map
