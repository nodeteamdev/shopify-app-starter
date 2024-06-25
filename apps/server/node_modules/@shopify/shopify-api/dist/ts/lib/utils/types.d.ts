import { AdapterArgs } from '../../runtime/types';
export declare enum HmacValidationType {
    Flow = "flow",
    Webhook = "webhook",
    FulfillmentService = "fulfillment_service"
}
export interface ValidateParams extends AdapterArgs {
    /**
     * The raw body of the request.
     */
    rawBody: string;
}
export declare const ValidationErrorReason: {
    readonly MissingBody: "missing_body";
    readonly InvalidHmac: "invalid_hmac";
    readonly MissingHmac: "missing_hmac";
};
export type ValidationErrorReasonType = (typeof ValidationErrorReason)[keyof typeof ValidationErrorReason];
export interface ValidationInvalid {
    /**
     * Whether the request is a valid Flow request from Shopify.
     */
    valid: false;
    /**
     * The reason why the request is not valid.
     */
    reason: ValidationErrorReasonType;
}
export interface ValidationValid {
    /**
     * Whether the request is a valid request from Shopify.
     */
    valid: true;
}
//# sourceMappingURL=types.d.ts.map