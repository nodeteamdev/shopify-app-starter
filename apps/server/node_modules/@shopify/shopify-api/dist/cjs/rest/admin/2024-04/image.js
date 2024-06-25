'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Image extends base.Base {
    static apiVersion = types.ApiVersion.April24;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["product_id", "id"], "path": "products/<product_id>/images/<id>.json" },
        { "http_method": "get", "operation": "count", "ids": ["product_id"], "path": "products/<product_id>/images/count.json" },
        { "http_method": "get", "operation": "get", "ids": ["product_id"], "path": "products/<product_id>/images.json" },
        { "http_method": "get", "operation": "get", "ids": ["product_id", "id"], "path": "products/<product_id>/images/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": ["product_id"], "path": "products/<product_id>/images.json" },
        { "http_method": "put", "operation": "put", "ids": ["product_id", "id"], "path": "products/<product_id>/images/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "image",
            "plural": "images"
        }
    ];
    static async find({ session, id, product_id = null, fields = null }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "id": id, "product_id": product_id },
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
    static async all({ session, product_id = null, since_id = null, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: { "product_id": product_id },
            params: { "since_id": since_id, "fields": fields, ...otherArgs },
        });
        return response;
    }
    static async count({ session, product_id = null, since_id = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: { "product_id": product_id },
            params: { "since_id": since_id, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    created_at;
    height;
    id;
    position;
    product_id;
    src;
    updated_at;
    variant_ids;
    width;
}

exports.Image = Image;
//# sourceMappingURL=image.js.map
