'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');
var image = require('./image.js');
var variant = require('./variant.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class ProductListing extends base.Base {
    static apiVersion = types.ApiVersion.April24;
    static hasOne = {};
    static hasMany = {
        "images": image.Image,
        "variants": variant.Variant
    };
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["product_id"], "path": "product_listings/<product_id>.json" },
        { "http_method": "get", "operation": "count", "ids": [], "path": "product_listings/count.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "product_listings.json" },
        { "http_method": "get", "operation": "get", "ids": ["product_id"], "path": "product_listings/<product_id>.json" },
        { "http_method": "get", "operation": "product_ids", "ids": [], "path": "product_listings/product_ids.json" },
        { "http_method": "put", "operation": "put", "ids": ["product_id"], "path": "product_listings/<product_id>.json" }
    ];
    static primaryKey = "product_id";
    static resourceNames = [
        {
            "singular": "product_listing",
            "plural": "product_listings"
        }
    ];
    static async find({ session, product_id }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "product_id": product_id },
            params: {},
        });
        return result.data ? result.data[0] : null;
    }
    static async delete({ session, product_id }) {
        const response = await this.request({
            http_method: "delete",
            operation: "delete",
            session: session,
            urlIds: { "product_id": product_id },
            params: {},
        });
        return response ? response.body : null;
    }
    static async all({ session, product_ids = null, limit = null, collection_id = null, updated_at_min = null, handle = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "product_ids": product_ids, "limit": limit, "collection_id": collection_id, "updated_at_min": updated_at_min, "handle": handle, ...otherArgs },
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
    static async product_ids({ session, limit = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "product_ids",
            session: session,
            urlIds: {},
            params: { "limit": limit, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    body_html;
    created_at;
    handle;
    images;
    options;
    product_id;
    product_type;
    published_at;
    tags;
    title;
    updated_at;
    variants;
    vendor;
}

exports.ProductListing = ProductListing;
//# sourceMappingURL=product_listing.js.map
