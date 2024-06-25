import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class SmartCollection extends Base {
    static apiVersion = ApiVersion.October22;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "smart_collections/<id>.json" },
        { "http_method": "get", "operation": "count", "ids": [], "path": "smart_collections/count.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "smart_collections.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "smart_collections/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "smart_collections.json" },
        { "http_method": "put", "operation": "order", "ids": ["id"], "path": "smart_collections/<id>/order.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "smart_collections/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "smart_collection",
            "plural": "smart_collections"
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
    static async all({ session, limit = null, ids = null, since_id = null, title = null, product_id = null, handle = null, updated_at_min = null, updated_at_max = null, published_at_min = null, published_at_max = null, published_status = null, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "limit": limit, "ids": ids, "since_id": since_id, "title": title, "product_id": product_id, "handle": handle, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, "published_at_min": published_at_min, "published_at_max": published_at_max, "published_status": published_status, "fields": fields, ...otherArgs },
        });
        return response;
    }
    static async count({ session, title = null, product_id = null, updated_at_min = null, updated_at_max = null, published_at_min = null, published_at_max = null, published_status = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: {},
            params: { "title": title, "product_id": product_id, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, "published_at_min": published_at_min, "published_at_max": published_at_max, "published_status": published_status, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    async order({ products = null, sort_order = null, body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "put",
            operation: "order",
            session: this.session,
            urlIds: { "id": this.id },
            params: { "products": products, "sort_order": sort_order, ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    rules;
    title;
    body_html;
    disjunctive;
    handle;
    id;
    image;
    published_at;
    published_scope;
    sort_order;
    template_suffix;
    updated_at;
}

export { SmartCollection };
//# sourceMappingURL=smart_collection.mjs.map
