'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');
var metafield = require('./metafield.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Customer extends base.Base {
    static apiVersion = types.ApiVersion.October22;
    static hasOne = {
        "metafield": metafield.Metafield
    };
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "customers/<id>.json" },
        { "http_method": "get", "operation": "count", "ids": [], "path": "customers/count.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "customers.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "customers/<id>.json" },
        { "http_method": "get", "operation": "orders", "ids": ["id"], "path": "customers/<id>/orders.json" },
        { "http_method": "get", "operation": "search", "ids": [], "path": "customers/search.json" },
        { "http_method": "post", "operation": "account_activation_url", "ids": ["id"], "path": "customers/<id>/account_activation_url.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "customers.json" },
        { "http_method": "post", "operation": "send_invite", "ids": ["id"], "path": "customers/<id>/send_invite.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "customers/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "customer",
            "plural": "customers"
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
    static async all({ session, ids = null, since_id = null, created_at_min = null, created_at_max = null, updated_at_min = null, updated_at_max = null, limit = null, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "ids": ids, "since_id": since_id, "created_at_min": created_at_min, "created_at_max": created_at_max, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, "limit": limit, "fields": fields, ...otherArgs },
        });
        return response;
    }
    static async count({ session, created_at_min = null, created_at_max = null, updated_at_min = null, updated_at_max = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: {},
            params: { "created_at_min": created_at_min, "created_at_max": created_at_max, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    static async orders({ session, id, status = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "orders",
            session: session,
            urlIds: { "id": id },
            params: { "status": status, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    static async search({ session, order = null, query = null, limit = null, fields = null, returnFullResponse = false, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "search",
            session: session,
            urlIds: {},
            params: { "order": order, "query": query, "limit": limit, "fields": fields, ...otherArgs },
            body: {},
            entity: null,
        });
        return returnFullResponse ? response : response?.body;
    }
    async account_activation_url({ body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "account_activation_url",
            session: this.session,
            urlIds: { "id": this.id },
            params: { ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    async send_invite({ body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "send_invite",
            session: this.session,
            urlIds: { "id": this.id },
            params: { ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    accepts_marketing;
    accepts_marketing_updated_at;
    addresses;
    created_at;
    currency;
    default_address;
    email;
    email_marketing_consent;
    first_name;
    id;
    last_name;
    last_order_id;
    last_order_name;
    marketing_opt_in_level;
    metafield;
    multipass_identifier;
    note;
    orders_count;
    password;
    password_confirmation;
    phone;
    sms_marketing_consent;
    state;
    tags;
    tax_exempt;
    tax_exemptions;
    total_spent;
    updated_at;
    verified_email;
}

exports.Customer = Customer;
//# sourceMappingURL=customer.js.map
