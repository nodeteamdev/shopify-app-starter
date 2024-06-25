'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class CancellationRequest extends base.Base {
    static apiVersion = types.ApiVersion.January23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "post", "operation": "accept", "ids": ["fulfillment_order_id"], "path": "fulfillment_orders/<fulfillment_order_id>/cancellation_request/accept.json" },
        { "http_method": "post", "operation": "post", "ids": ["fulfillment_order_id"], "path": "fulfillment_orders/<fulfillment_order_id>/cancellation_request.json" },
        { "http_method": "post", "operation": "reject", "ids": ["fulfillment_order_id"], "path": "fulfillment_orders/<fulfillment_order_id>/cancellation_request/reject.json" }
    ];
    static resourceNames = [
        {
            "singular": "cancellation_request",
            "plural": "cancellation_requests"
        }
    ];
    async accept({ message = null, body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "accept",
            session: this.session,
            urlIds: { "fulfillment_order_id": this.fulfillment_order_id },
            params: { "message": message, ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    async reject({ message = null, body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "reject",
            session: this.session,
            urlIds: { "fulfillment_order_id": this.fulfillment_order_id },
            params: { "message": message, ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    fulfillment_order_id;
}

exports.CancellationRequest = CancellationRequest;
//# sourceMappingURL=cancellation_request.js.map
