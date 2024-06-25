'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Metafield extends base.Base {
    static apiVersion = types.ApiVersion.April24;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["article_id", "id"], "path": "articles/<article_id>/metafields/<id>.json" },
        { "http_method": "delete", "operation": "delete", "ids": ["blog_id", "id"], "path": "blogs/<blog_id>/metafields/<id>.json" },
        { "http_method": "delete", "operation": "delete", "ids": ["blog_id", "id"], "path": "blogs/<blog_id>/metafields/<id>.json" },
        { "http_method": "delete", "operation": "delete", "ids": ["collection_id", "id"], "path": "collections/<collection_id>/metafields/<id>.json" },
        { "http_method": "delete", "operation": "delete", "ids": ["customer_id", "id"], "path": "customers/<customer_id>/metafields/<id>.json" },
        { "http_method": "delete", "operation": "delete", "ids": ["draft_order_id", "id"], "path": "draft_orders/<draft_order_id>/metafields/<id>.json" },
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "metafields/<id>.json" },
        { "http_method": "delete", "operation": "delete", "ids": ["order_id", "id"], "path": "orders/<order_id>/metafields/<id>.json" },
        { "http_method": "delete", "operation": "delete", "ids": ["page_id", "id"], "path": "pages/<page_id>/metafields/<id>.json" },
        { "http_method": "delete", "operation": "delete", "ids": ["product_image_id", "id"], "path": "product_images/<product_image_id>/metafields/<id>.json" },
        { "http_method": "delete", "operation": "delete", "ids": ["product_id", "id"], "path": "products/<product_id>/metafields/<id>.json" },
        { "http_method": "delete", "operation": "delete", "ids": ["variant_id", "id"], "path": "variants/<variant_id>/metafields/<id>.json" },
        { "http_method": "get", "operation": "count", "ids": ["article_id"], "path": "articles/<article_id>/metafields/count.json" },
        { "http_method": "get", "operation": "count", "ids": ["blog_id"], "path": "blogs/<blog_id>/metafields/count.json" },
        { "http_method": "get", "operation": "count", "ids": ["blog_id"], "path": "blogs/<blog_id>/metafields/count.json" },
        { "http_method": "get", "operation": "count", "ids": ["collection_id"], "path": "collections/<collection_id>/metafields/count.json" },
        { "http_method": "get", "operation": "count", "ids": ["customer_id"], "path": "customers/<customer_id>/metafields/count.json" },
        { "http_method": "get", "operation": "count", "ids": ["draft_order_id"], "path": "draft_orders/<draft_order_id>/metafields/count.json" },
        { "http_method": "get", "operation": "count", "ids": [], "path": "metafields/count.json" },
        { "http_method": "get", "operation": "count", "ids": ["order_id"], "path": "orders/<order_id>/metafields/count.json" },
        { "http_method": "get", "operation": "count", "ids": ["page_id"], "path": "pages/<page_id>/metafields/count.json" },
        { "http_method": "get", "operation": "count", "ids": ["product_image_id"], "path": "product_images/<product_image_id>/metafields/count.json" },
        { "http_method": "get", "operation": "count", "ids": ["product_id"], "path": "products/<product_id>/metafields/count.json" },
        { "http_method": "get", "operation": "count", "ids": ["variant_id"], "path": "variants/<variant_id>/metafields/count.json" },
        { "http_method": "get", "operation": "get", "ids": ["article_id"], "path": "articles/<article_id>/metafields.json" },
        { "http_method": "get", "operation": "get", "ids": ["article_id", "id"], "path": "articles/<article_id>/metafields/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": ["blog_id"], "path": "blogs/<blog_id>/metafields.json" },
        { "http_method": "get", "operation": "get", "ids": ["blog_id"], "path": "blogs/<blog_id>/metafields.json" },
        { "http_method": "get", "operation": "get", "ids": ["blog_id", "id"], "path": "blogs/<blog_id>/metafields/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": ["blog_id", "id"], "path": "blogs/<blog_id>/metafields/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": ["collection_id"], "path": "collections/<collection_id>/metafields.json" },
        { "http_method": "get", "operation": "get", "ids": ["collection_id", "id"], "path": "collections/<collection_id>/metafields/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": ["customer_id"], "path": "customers/<customer_id>/metafields.json" },
        { "http_method": "get", "operation": "get", "ids": ["customer_id", "id"], "path": "customers/<customer_id>/metafields/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": ["draft_order_id"], "path": "draft_orders/<draft_order_id>/metafields.json" },
        { "http_method": "get", "operation": "get", "ids": ["draft_order_id", "id"], "path": "draft_orders/<draft_order_id>/metafields/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "metafields.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "metafields/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": ["order_id"], "path": "orders/<order_id>/metafields.json" },
        { "http_method": "get", "operation": "get", "ids": ["order_id", "id"], "path": "orders/<order_id>/metafields/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": ["page_id"], "path": "pages/<page_id>/metafields.json" },
        { "http_method": "get", "operation": "get", "ids": ["page_id", "id"], "path": "pages/<page_id>/metafields/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": ["product_image_id"], "path": "product_images/<product_image_id>/metafields.json" },
        { "http_method": "get", "operation": "get", "ids": ["product_image_id", "id"], "path": "product_images/<product_image_id>/metafields/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": ["product_id"], "path": "products/<product_id>/metafields.json" },
        { "http_method": "get", "operation": "get", "ids": ["product_id", "id"], "path": "products/<product_id>/metafields/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": ["variant_id"], "path": "variants/<variant_id>/metafields.json" },
        { "http_method": "get", "operation": "get", "ids": ["variant_id", "id"], "path": "variants/<variant_id>/metafields/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": ["article_id"], "path": "articles/<article_id>/metafields.json" },
        { "http_method": "post", "operation": "post", "ids": ["blog_id"], "path": "blogs/<blog_id>/metafields.json" },
        { "http_method": "post", "operation": "post", "ids": ["blog_id"], "path": "blogs/<blog_id>/metafields.json" },
        { "http_method": "post", "operation": "post", "ids": ["collection_id"], "path": "collections/<collection_id>/metafields.json" },
        { "http_method": "post", "operation": "post", "ids": ["customer_id"], "path": "customers/<customer_id>/metafields.json" },
        { "http_method": "post", "operation": "post", "ids": ["draft_order_id"], "path": "draft_orders/<draft_order_id>/metafields.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "metafields.json" },
        { "http_method": "post", "operation": "post", "ids": ["order_id"], "path": "orders/<order_id>/metafields.json" },
        { "http_method": "post", "operation": "post", "ids": ["page_id"], "path": "pages/<page_id>/metafields.json" },
        { "http_method": "post", "operation": "post", "ids": ["product_image_id"], "path": "product_images/<product_image_id>/metafields.json" },
        { "http_method": "post", "operation": "post", "ids": ["product_id"], "path": "products/<product_id>/metafields.json" },
        { "http_method": "post", "operation": "post", "ids": ["variant_id"], "path": "variants/<variant_id>/metafields.json" },
        { "http_method": "put", "operation": "put", "ids": ["article_id", "id"], "path": "articles/<article_id>/metafields/<id>.json" },
        { "http_method": "put", "operation": "put", "ids": ["blog_id", "id"], "path": "blogs/<blog_id>/metafields/<id>.json" },
        { "http_method": "put", "operation": "put", "ids": ["blog_id", "id"], "path": "blogs/<blog_id>/metafields/<id>.json" },
        { "http_method": "put", "operation": "put", "ids": ["collection_id", "id"], "path": "collections/<collection_id>/metafields/<id>.json" },
        { "http_method": "put", "operation": "put", "ids": ["customer_id", "id"], "path": "customers/<customer_id>/metafields/<id>.json" },
        { "http_method": "put", "operation": "put", "ids": ["draft_order_id", "id"], "path": "draft_orders/<draft_order_id>/metafields/<id>.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "metafields/<id>.json" },
        { "http_method": "put", "operation": "put", "ids": ["order_id", "id"], "path": "orders/<order_id>/metafields/<id>.json" },
        { "http_method": "put", "operation": "put", "ids": ["page_id", "id"], "path": "pages/<page_id>/metafields/<id>.json" },
        { "http_method": "put", "operation": "put", "ids": ["product_image_id", "id"], "path": "product_images/<product_image_id>/metafields/<id>.json" },
        { "http_method": "put", "operation": "put", "ids": ["product_id", "id"], "path": "products/<product_id>/metafields/<id>.json" },
        { "http_method": "put", "operation": "put", "ids": ["variant_id", "id"], "path": "variants/<variant_id>/metafields/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "metafield",
            "plural": "metafields"
        }
    ];
    static async find({ session, id, article_id = null, blog_id = null, collection_id = null, customer_id = null, draft_order_id = null, order_id = null, page_id = null, product_image_id = null, product_id = null, variant_id = null, fields = null }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "id": id, "article_id": article_id, "blog_id": blog_id, "collection_id": collection_id, "customer_id": customer_id, "draft_order_id": draft_order_id, "order_id": order_id, "page_id": page_id, "product_image_id": product_image_id, "product_id": product_id, "variant_id": variant_id },
            params: { "fields": fields },
        });
        return result.data ? result.data[0] : null;
    }
    static async delete({ session, id, article_id = null, blog_id = null, collection_id = null, customer_id = null, draft_order_id = null, order_id = null, page_id = null, product_image_id = null, product_id = null, variant_id = null }) {
        const response = await this.request({
            http_method: "delete",
            operation: "delete",
            session: session,
            urlIds: { "id": id, "article_id": article_id, "blog_id": blog_id, "collection_id": collection_id, "customer_id": customer_id, "draft_order_id": draft_order_id, "order_id": order_id, "page_id": page_id, "product_image_id": product_image_id, "product_id": product_id, "variant_id": variant_id },
            params: {},
        });
        return response ? response.body : null;
    }
    static async all({ session, article_id = null, blog_id = null, collection_id = null, customer_id = null, draft_order_id = null, order_id = null, page_id = null, product_image_id = null, product_id = null, variant_id = null, limit = null, since_id = null, created_at_min = null, created_at_max = null, updated_at_min = null, updated_at_max = null, namespace = null, key = null, type = null, fields = null, metafield = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: { "article_id": article_id, "blog_id": blog_id, "collection_id": collection_id, "customer_id": customer_id, "draft_order_id": draft_order_id, "order_id": order_id, "page_id": page_id, "product_image_id": product_image_id, "product_id": product_id, "variant_id": variant_id },
            params: { "limit": limit, "since_id": since_id, "created_at_min": created_at_min, "created_at_max": created_at_max, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, "namespace": namespace, "key": key, "type": type, "fields": fields, "metafield": metafield, ...otherArgs },
        });
        return response;
    }
    static async count({ session, article_id = null, blog_id = null, collection_id = null, customer_id = null, draft_order_id = null, order_id = null, page_id = null, product_image_id = null, product_id = null, variant_id = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: { "article_id": article_id, "blog_id": blog_id, "collection_id": collection_id, "customer_id": customer_id, "draft_order_id": draft_order_id, "order_id": order_id, "page_id": page_id, "product_image_id": product_image_id, "product_id": product_id, "variant_id": variant_id },
            params: { ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    key;
    namespace;
    value;
    article_id;
    blog_id;
    collection_id;
    created_at;
    customer_id;
    description;
    draft_order_id;
    id;
    order_id;
    owner_id;
    owner_resource;
    page_id;
    product_id;
    product_image_id;
    type;
    updated_at;
    variant_id;
}

exports.Metafield = Metafield;
//# sourceMappingURL=metafield.js.map
