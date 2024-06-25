'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');
var customer = require('./customer.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class DraftOrder extends base.Base {
    static apiVersion = types.ApiVersion.April24;
    static hasOne = {
        "customer": customer.Customer
    };
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "draft_orders/<id>.json" },
        { "http_method": "get", "operation": "count", "ids": [], "path": "draft_orders/count.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "draft_orders.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "draft_orders/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "draft_orders.json" },
        { "http_method": "post", "operation": "send_invoice", "ids": ["id"], "path": "draft_orders/<id>/send_invoice.json" },
        { "http_method": "put", "operation": "complete", "ids": ["id"], "path": "draft_orders/<id>/complete.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "draft_orders/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "draft_order",
            "plural": "draft_orders"
        }
    ];
    static async find({ session, id, fields = null }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "id": id },
            params: { "fields": fields },
        });
        return result.data ? result.data[0] : null;
    }
    static async delete({ session, id }) {
        const response = await this.request({
            http_method: "delete",
            operation: "delete",
            session: session,
            urlIds: { "id": id },
            params: {},
        });
        return response ? response.body : null;
    }
    static async all({ session, fields = null, limit = null, since_id = null, updated_at_min = null, updated_at_max = null, ids = null, status = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "fields": fields, "limit": limit, "since_id": since_id, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, "ids": ids, "status": status, ...otherArgs },
        });
        return response;
    }
    static async count({ session, since_id = null, status = null, updated_at_max = null, updated_at_min = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: {},
            params: { "since_id": since_id, "status": status, "updated_at_max": updated_at_max, "updated_at_min": updated_at_min, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    async send_invoice({ body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "send_invoice",
            session: this.session,
            urlIds: { "id": this.id },
            params: { ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    async complete({ payment_gateway_id = null, payment_pending = null, body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "put",
            operation: "complete",
            session: this.session,
            urlIds: { "id": this.id },
            params: { "payment_gateway_id": payment_gateway_id, "payment_pending": payment_pending, ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    applied_discount;
    billing_address;
    completed_at;
    created_at;
    currency;
    customer;
    email;
    id;
    invoice_sent_at;
    invoice_url;
    line_items;
    name;
    note;
    note_attributes;
    order_id;
    payment_terms;
    shipping_address;
    shipping_line;
    source_name;
    status;
    subtotal_price;
    tags;
    tax_exempt;
    tax_exemptions;
    tax_lines;
    taxes_included;
    total_price;
    total_tax;
    updated_at;
}

exports.DraftOrder = DraftOrder;
//# sourceMappingURL=draft_order.js.map
