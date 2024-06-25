'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Fulfillment extends base.Base {
    static apiVersion = types.ApiVersion.April23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "count", "ids": ["order_id"], "path": "orders/<order_id>/fulfillments/count.json" },
        { "http_method": "get", "operation": "get", "ids": ["fulfillment_order_id"], "path": "fulfillment_orders/<fulfillment_order_id>/fulfillments.json" },
        { "http_method": "get", "operation": "get", "ids": ["order_id"], "path": "orders/<order_id>/fulfillments.json" },
        { "http_method": "get", "operation": "get", "ids": ["order_id", "id"], "path": "orders/<order_id>/fulfillments/<id>.json" },
        { "http_method": "post", "operation": "cancel", "ids": ["id"], "path": "fulfillments/<id>/cancel.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "fulfillments.json" },
        { "http_method": "post", "operation": "update_tracking", "ids": ["id"], "path": "fulfillments/<id>/update_tracking.json" }
    ];
    static resourceNames = [
        {
            "singular": "fulfillment",
            "plural": "fulfillments"
        }
    ];
    static async find({ session, id, order_id = null, fields = null }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "id": id, "order_id": order_id },
            params: { "fields": fields },
        });
        return result.data ? result.data[0] : null;
    }
    static async all({ session, fulfillment_order_id = null, order_id = null, created_at_max = null, created_at_min = null, fields = null, limit = null, since_id = null, updated_at_max = null, updated_at_min = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: { "fulfillment_order_id": fulfillment_order_id, "order_id": order_id },
            params: { "created_at_max": created_at_max, "created_at_min": created_at_min, "fields": fields, "limit": limit, "since_id": since_id, "updated_at_max": updated_at_max, "updated_at_min": updated_at_min, ...otherArgs },
        });
        return response;
    }
    static async count({ session, order_id = null, created_at_min = null, created_at_max = null, updated_at_min = null, updated_at_max = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: { "order_id": order_id },
            params: { "created_at_min": created_at_min, "created_at_max": created_at_max, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
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
    async update_tracking({ notify_customer = null, tracking_info = null, body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "update_tracking",
            session: this.session,
            urlIds: { "id": this.id },
            params: { "notify_customer": notify_customer, "tracking_info": tracking_info, ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    created_at;
    id;
    line_items;
    location_id;
    name;
    notify_customer;
    order_id;
    origin_address;
    receipt;
    service;
    shipment_status;
    status;
    tracking_company;
    tracking_number;
    tracking_numbers;
    tracking_url;
    tracking_urls;
    updated_at;
    variant_inventory_management;
}

exports.Fulfillment = Fulfillment;
//# sourceMappingURL=fulfillment.js.map
