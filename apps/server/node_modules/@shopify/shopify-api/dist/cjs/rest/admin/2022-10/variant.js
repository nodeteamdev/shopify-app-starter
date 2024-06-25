'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Variant extends base.Base {
    static apiVersion = types.ApiVersion.October22;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["product_id", "id"], "path": "products/<product_id>/variants/<id>.json" },
        { "http_method": "get", "operation": "count", "ids": ["product_id"], "path": "products/<product_id>/variants/count.json" },
        { "http_method": "get", "operation": "get", "ids": ["product_id"], "path": "products/<product_id>/variants.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "variants/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": ["product_id"], "path": "products/<product_id>/variants.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "variants/<id>.json" }
    ];
    static readOnlyAttributes = [
        "inventory_quantity"
    ];
    static resourceNames = [
        {
            "singular": "variant",
            "plural": "variants"
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
    static async delete({ session, id, product_id = null }) {
        const response = await this.request({
            http_method: "delete",
            operation: "delete",
            session: session,
            urlIds: { "id": id, "product_id": product_id },
            params: {},
        });
        return response ? response.body : null;
    }
    static async all({ session, product_id = null, limit = null, presentment_currencies = null, since_id = null, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: { "product_id": product_id },
            params: { "limit": limit, "presentment_currencies": presentment_currencies, "since_id": since_id, "fields": fields, ...otherArgs },
        });
        return response;
    }
    static async count({ session, product_id = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: { "product_id": product_id },
            params: { ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    barcode;
    compare_at_price;
    created_at;
    fulfillment_service;
    grams;
    id;
    image_id;
    inventory_item_id;
    inventory_management;
    inventory_policy;
    inventory_quantity;
    old_inventory_quantity;
    option;
    position;
    presentment_prices;
    price;
    product_id;
    requires_shipping;
    sku;
    tax_code;
    taxable;
    title;
    updated_at;
    weight;
    weight_unit;
}

exports.Variant = Variant;
//# sourceMappingURL=variant.js.map
