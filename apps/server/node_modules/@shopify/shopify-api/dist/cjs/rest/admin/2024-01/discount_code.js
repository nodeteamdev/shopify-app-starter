'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class DiscountCode extends base.Base {
    static apiVersion = types.ApiVersion.January24;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["price_rule_id", "id"], "path": "price_rules/<price_rule_id>/discount_codes/<id>.json" },
        { "http_method": "get", "operation": "count", "ids": [], "path": "discount_codes/count.json" },
        { "http_method": "get", "operation": "get", "ids": ["price_rule_id", "batch_id"], "path": "price_rules/<price_rule_id>/batch/<batch_id>/discount_codes.json" },
        { "http_method": "get", "operation": "get", "ids": ["price_rule_id"], "path": "price_rules/<price_rule_id>/discount_codes.json" },
        { "http_method": "get", "operation": "get", "ids": ["price_rule_id", "id"], "path": "price_rules/<price_rule_id>/discount_codes/<id>.json" },
        { "http_method": "get", "operation": "get_all", "ids": ["price_rule_id", "batch_id"], "path": "price_rules/<price_rule_id>/batch/<batch_id>.json" },
        { "http_method": "get", "operation": "lookup", "ids": [], "path": "discount_codes/lookup.json" },
        { "http_method": "post", "operation": "batch", "ids": ["price_rule_id"], "path": "price_rules/<price_rule_id>/batch.json" },
        { "http_method": "post", "operation": "post", "ids": ["price_rule_id"], "path": "price_rules/<price_rule_id>/discount_codes.json" },
        { "http_method": "put", "operation": "put", "ids": ["price_rule_id", "id"], "path": "price_rules/<price_rule_id>/discount_codes/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "discount_code",
            "plural": "discount_codes"
        }
    ];
    static async find({ session, id, price_rule_id = null }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "id": id, "price_rule_id": price_rule_id },
            params: {},
        });
        return result.data ? result.data[0] : null;
    }
    static async delete({ session, id, price_rule_id = null }) {
        const response = await this.request({
            http_method: "delete",
            operation: "delete",
            session: session,
            urlIds: { "id": id, "price_rule_id": price_rule_id },
            params: {},
        });
        return response ? response.body : null;
    }
    static async all({ session, price_rule_id = null, batch_id = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: { "price_rule_id": price_rule_id, "batch_id": batch_id },
            params: { ...otherArgs },
        });
        return response;
    }
    static async count({ session, times_used = null, times_used_min = null, times_used_max = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: {},
            params: { "times_used": times_used, "times_used_min": times_used_min, "times_used_max": times_used_max, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    static async get_all({ session, price_rule_id = null, batch_id = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "get_all",
            session: session,
            urlIds: { "price_rule_id": price_rule_id, "batch_id": batch_id },
            params: { ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    static async lookup({ session, code = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "lookup",
            session: session,
            urlIds: {},
            params: { "code": code, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    async batch({ body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "batch",
            session: this.session,
            urlIds: { "price_rule_id": this.price_rule_id },
            params: { ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    code;
    created_at;
    errors;
    id;
    price_rule_id;
    updated_at;
    usage_count;
}

exports.DiscountCode = DiscountCode;
//# sourceMappingURL=discount_code.js.map
