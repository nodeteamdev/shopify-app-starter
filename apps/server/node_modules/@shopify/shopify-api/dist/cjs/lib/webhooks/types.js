'use strict';

var types = require('../utils/types.js');

exports.DeliveryMethod = void 0;
(function (DeliveryMethod) {
    DeliveryMethod["Http"] = "http";
    DeliveryMethod["EventBridge"] = "eventbridge";
    DeliveryMethod["PubSub"] = "pubsub";
})(exports.DeliveryMethod || (exports.DeliveryMethod = {}));
// eslint-disable-next-line no-warning-comments
// TODO Rethink the wording for this enum - the operations we're doing are actually "subscribing" and "unsubscribing"
// Consider changing the values when releasing v12.0.0 when it can be safely deprecated
exports.WebhookOperation = void 0;
(function (WebhookOperation) {
    WebhookOperation["Create"] = "create";
    WebhookOperation["Update"] = "update";
    WebhookOperation["Delete"] = "delete";
})(exports.WebhookOperation || (exports.WebhookOperation = {}));
const WebhookValidationErrorReason = {
    ...types.ValidationErrorReason,
    MissingHeaders: 'missing_headers',
};

exports.WebhookValidationErrorReason = WebhookValidationErrorReason;
//# sourceMappingURL=types.js.map
