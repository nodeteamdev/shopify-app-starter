'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class PriceRule extends base.Base {
    static apiVersion = types.ApiVersion.April24;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "price_rules/<id>.json" },
        { "http_method": "get", "operation": "count", "ids": [], "path": "price_rules/count.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "price_rules.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "price_rules/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "price_rules.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "price_rules/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "price_rule",
            "plural": "price_rules"
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
    static async all({ session, limit = null, since_id = null, created_at_min = null, created_at_max = null, updated_at_min = null, updated_at_max = null, starts_at_min = null, starts_at_max = null, ends_at_min = null, ends_at_max = null, times_used = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "limit": limit, "since_id": since_id, "created_at_min": created_at_min, "created_at_max": created_at_max, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, "starts_at_min": starts_at_min, "starts_at_max": starts_at_max, "ends_at_min": ends_at_min, "ends_at_max": ends_at_max, "times_used": times_used, ...otherArgs },
        });
        return response;
    }
    static async count({ session, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: {},
            params: { ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    allocation_limit;
    allocation_method;
    created_at;
    customer_segment_prerequisite_ids;
    customer_selection;
    ends_at;
    entitled_collection_ids;
    entitled_country_ids;
    entitled_product_ids;
    entitled_variant_ids;
    id;
    once_per_customer;
    prerequisite_collection_ids;
    prerequisite_customer_ids;
    prerequisite_product_ids;
    prerequisite_quantity_range;
    prerequisite_shipping_price_range;
    prerequisite_subtotal_range;
    prerequisite_to_entitlement_purchase;
    prerequisite_to_entitlement_quantity_ratio;
    prerequisite_variant_ids;
    starts_at;
    target_selection;
    target_type;
    title;
    updated_at;
    usage_limit;
    value;
    value_type;
}

exports.PriceRule = PriceRule;
//# sourceMappingURL=price_rule.js.map
