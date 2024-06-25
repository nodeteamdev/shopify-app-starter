'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');
var image = require('./image.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class CollectionListing extends base.Base {
    static apiVersion = types.ApiVersion.January24;
    static hasOne = {
        "image": image.Image
    };
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["collection_id"], "path": "collection_listings/<collection_id>.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "collection_listings.json" },
        { "http_method": "get", "operation": "get", "ids": ["collection_id"], "path": "collection_listings/<collection_id>.json" },
        { "http_method": "get", "operation": "product_ids", "ids": ["collection_id"], "path": "collection_listings/<collection_id>/product_ids.json" },
        { "http_method": "put", "operation": "put", "ids": ["collection_id"], "path": "collection_listings/<collection_id>.json" }
    ];
    static primaryKey = "collection_id";
    static resourceNames = [
        {
            "singular": "collection_listing",
            "plural": "collection_listings"
        }
    ];
    static async find({ session, collection_id }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "collection_id": collection_id },
            params: {},
        });
        return result.data ? result.data[0] : null;
    }
    static async delete({ session, collection_id }) {
        const response = await this.request({
            http_method: "delete",
            operation: "delete",
            session: session,
            urlIds: { "collection_id": collection_id },
            params: {},
        });
        return response ? response.body : null;
    }
    static async all({ session, limit = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "limit": limit, ...otherArgs },
        });
        return response;
    }
    static async product_ids({ session, collection_id, limit = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "product_ids",
            session: session,
            urlIds: { "collection_id": collection_id },
            params: { "limit": limit, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    body_html;
    collection_id;
    default_product_image;
    handle;
    image;
    published_at;
    sort_order;
    title;
    updated_at;
}

exports.CollectionListing = CollectionListing;
//# sourceMappingURL=collection_listing.js.map
