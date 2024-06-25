'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class FulfillmentOrder extends base.Base {
    static apiVersion = types.ApiVersion.October22;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "fulfillment_orders/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": ["order_id"], "path": "orders/<order_id>/fulfillment_orders.json" },
        { "http_method": "post", "operation": "cancel", "ids": ["id"], "path": "fulfillment_orders/<id>/cancel.json" },
        { "http_method": "post", "operation": "close", "ids": ["id"], "path": "fulfillment_orders/<id>/close.json" },
        { "http_method": "post", "operation": "hold", "ids": ["id"], "path": "fulfillment_orders/<id>/hold.json" },
        { "http_method": "post", "operation": "move", "ids": ["id"], "path": "fulfillment_orders/<id>/move.json" },
        { "http_method": "post", "operation": "open", "ids": ["id"], "path": "fulfillment_orders/<id>/open.json" },
        { "http_method": "post", "operation": "release_hold", "ids": ["id"], "path": "fulfillment_orders/<id>/release_hold.json" },
        { "http_method": "post", "operation": "reschedule", "ids": ["id"], "path": "fulfillment_orders/<id>/reschedule.json" },
        { "http_method": "post", "operation": "set_fulfillment_orders_deadline", "ids": [], "path": "fulfillment_orders/set_fulfillment_orders_deadline.json" }
    ];
    static resourceNames = [
        {
            "singular": "fulfillment_order",
            "plural": "fulfillment_orders"
        }
    ];
    static async find({ session, id }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "id": id },
            params: {},
        });
        return result.data ? result.data[0] : null;
    }
    static async all({ session, order_id = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: { "order_id": order_id },
            params: { ...otherArgs },
        });
        return response;
    }
    async cancel({ body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "cancel",
            session: this.session,
            urlIds: { "id": this.id },
            params: { ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    async close({ message = null, body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "close",
            session: this.session,
            urlIds: { "id": this.id },
            params: { "message": message, ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    async hold({ fulfillment_hold = null, body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "hold",
            session: this.session,
            urlIds: { "id": this.id },
            params: { "fulfillment_hold": fulfillment_hold, ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    async move({ fulfillment_order = null, body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "move",
            session: this.session,
            urlIds: { "id": this.id },
            params: { "fulfillment_order": fulfillment_order, ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    async open({ body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "open",
            session: this.session,
            urlIds: { "id": this.id },
            params: { ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    async release_hold({ body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "release_hold",
            session: this.session,
            urlIds: { "id": this.id },
            params: { ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    async reschedule({ body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "reschedule",
            session: this.session,
            urlIds: { "id": this.id },
            params: { ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    async set_fulfillment_orders_deadline({ fulfillment_order_ids = null, fulfillment_deadline = null, body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "set_fulfillment_orders_deadline",
            session: this.session,
            urlIds: {},
            params: { "fulfillment_order_ids": fulfillment_order_ids, "fulfillment_deadline": fulfillment_deadline, ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    assigned_location;
    assigned_location_id;
    delivery_method;
    destination;
    fulfill_at;
    fulfill_by;
    fulfillment_holds;
    id;
    international_duties;
    line_items;
    merchant_requests;
    order_id;
    request_status;
    shop_id;
    status;
    supported_actions;
}

exports.FulfillmentOrder = FulfillmentOrder;
//# sourceMappingURL=fulfillment_order.js.map
