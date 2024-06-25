import { ValidationErrorReason } from '../utils/types.mjs';

var DeliveryMethod;
(function (DeliveryMethod) {
    DeliveryMethod["Http"] = "http";
    DeliveryMethod["EventBridge"] = "eventbridge";
    DeliveryMethod["PubSub"] = "pubsub";
})(DeliveryMethod || (DeliveryMethod = {}));
// eslint-disable-next-line no-warning-comments
// TODO Rethink the wording for this enum - the operations we're doing are actually "subscribing" and "unsubscribing"
// Consider changing the values when releasing v12.0.0 when it can be safely deprecated
var WebhookOperation;
(function (WebhookOperation) {
    WebhookOperation["Create"] = "create";
    WebhookOperation["Update"] = "update";
    WebhookOperation["Delete"] = "delete";
})(WebhookOperation || (WebhookOperation = {}));
const WebhookValidationErrorReason = {
    ...ValidationErrorReason,
    MissingHeaders: 'missing_headers',
};

export { DeliveryMethod, WebhookOperation, WebhookValidationErrorReason };
//# sourceMappingURL=types.mjs.map
