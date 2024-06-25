'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');
var customer = require('./customer.js');
var discount_code = require('./discount_code.js');
var fulfillment = require('./fulfillment.js');
var refund = require('./refund.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Order extends base.Base {
    static apiVersion = types.ApiVersion.January24;
    static hasOne = {
        "customer": customer.Customer
    };
    static hasMany = {
        "discount_codes": discount_code.DiscountCode,
        "fulfillments": fulfillment.Fulfillment,
        "refunds": refund.Refund
    };
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "orders/<id>.json" },
        { "http_method": "get", "operation": "count", "ids": [], "path": "orders/count.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "orders.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "orders/<id>.json" },
        { "http_method": "post", "operation": "cancel", "ids": ["id"], "path": "orders/<id>/cancel.json" },
        { "http_method": "post", "operation": "close", "ids": ["id"], "path": "orders/<id>/close.json" },
        { "http_method": "post", "operation": "open", "ids": ["id"], "path": "orders/<id>/open.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "orders.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "orders/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "order",
            "plural": "orders"
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
    static async all({ session, ids = null, limit = null, since_id = null, created_at_min = null, created_at_max = null, updated_at_min = null, updated_at_max = null, processed_at_min = null, processed_at_max = null, attribution_app_id = null, status = null, financial_status = null, fulfillment_status = null, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "ids": ids, "limit": limit, "since_id": since_id, "created_at_min": created_at_min, "created_at_max": created_at_max, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, "processed_at_min": processed_at_min, "processed_at_max": processed_at_max, "attribution_app_id": attribution_app_id, "status": status, "financial_status": financial_status, "fulfillment_status": fulfillment_status, "fields": fields, ...otherArgs },
        });
        return response;
    }
    static async count({ session, created_at_min = null, created_at_max = null, updated_at_min = null, updated_at_max = null, status = null, financial_status = null, fulfillment_status = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: {},
            params: { "created_at_min": created_at_min, "created_at_max": created_at_max, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, "status": status, "financial_status": financial_status, "fulfillment_status": fulfillment_status, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    async cancel({ amount = null, currency = null, restock = null, reason = null, email = null, refund = null, body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "cancel",
            session: this.session,
            urlIds: { "id": this.id },
            params: { "amount": amount, "currency": currency, "restock": restock, "reason": reason, "email": email, "refund": refund, ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    async close({ body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "close",
            session: this.session,
            urlIds: { "id": this.id },
            params: { ...otherArgs },
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
    line_items;
    app_id;
    billing_address;
    browser_ip;
    buyer_accepts_marketing;
    cancel_reason;
    cancelled_at;
    cart_token;
    checkout_token;
    client_details;
    closed_at;
    company;
    confirmation_number;
    created_at;
    currency;
    current_subtotal_price;
    current_subtotal_price_set;
    current_total_additional_fees_set;
    current_total_discounts;
    current_total_discounts_set;
    current_total_duties_set;
    current_total_price;
    current_total_price_set;
    current_total_tax;
    current_total_tax_set;
    customer;
    customer_locale;
    discount_applications;
    discount_codes;
    email;
    estimated_taxes;
    financial_status;
    fulfillment_status;
    fulfillments;
    gateway;
    id;
    landing_site;
    location_id;
    merchant_of_record_app_id;
    name;
    note;
    note_attributes;
    number;
    order_number;
    order_status_url;
    original_total_additional_fees_set;
    original_total_duties_set;
    payment_gateway_names;
    payment_terms;
    phone;
    po_number;
    presentment_currency;
    processed_at;
    referring_site;
    refunds;
    shipping_address;
    shipping_lines;
    source_identifier;
    source_name;
    source_url;
    subtotal_price;
    subtotal_price_set;
    tags;
    tax_lines;
    taxes_included;
    test;
    token;
    total_discounts;
    total_discounts_set;
    total_line_items_price;
    total_line_items_price_set;
    total_outstanding;
    total_price;
    total_price_set;
    total_shipping_price_set;
    total_tax;
    total_tax_set;
    total_tip_received;
    total_weight;
    updated_at;
    user_id;
}

exports.Order = Order;
//# sourceMappingURL=order.js.map
