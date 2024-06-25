import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';
import { Metafield } from './metafield.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Page extends Base {
    static apiVersion = ApiVersion.October22;
    static hasOne = {
        "metafield": Metafield
    };
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "pages/<id>.json" },
        { "http_method": "get", "operation": "count", "ids": [], "path": "pages/count.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "pages.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "pages/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "pages.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "pages/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "page",
            "plural": "pages"
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
    static async all({ session, limit = null, since_id = null, title = null, handle = null, created_at_min = null, created_at_max = null, updated_at_min = null, updated_at_max = null, published_at_min = null, published_at_max = null, fields = null, published_status = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "limit": limit, "since_id": since_id, "title": title, "handle": handle, "created_at_min": created_at_min, "created_at_max": created_at_max, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, "published_at_min": published_at_min, "published_at_max": published_at_max, "fields": fields, "published_status": published_status, ...otherArgs },
        });
        return response;
    }
    static async count({ session, title = null, created_at_min = null, created_at_max = null, updated_at_min = null, updated_at_max = null, published_at_min = null, published_at_max = null, published_status = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: {},
            params: { "title": title, "created_at_min": created_at_min, "created_at_max": created_at_max, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, "published_at_min": published_at_min, "published_at_max": published_at_max, "published_status": published_status, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    admin_graphql_api_id;
    author;
    body_html;
    created_at;
    handle;
    id;
    metafield;
    published_at;
    shop_id;
    template_suffix;
    title;
    updated_at;
}

export { Page };
//# sourceMappingURL=page.mjs.map
