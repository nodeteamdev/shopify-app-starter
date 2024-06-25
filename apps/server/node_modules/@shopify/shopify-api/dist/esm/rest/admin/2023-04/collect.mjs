import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Collect extends Base {
    static apiVersion = ApiVersion.April23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "collects/<id>.json" },
        { "http_method": "get", "operation": "count", "ids": [], "path": "collects/count.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "collects.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "collects/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "collects.json" }
    ];
    static resourceNames = [
        {
            "singular": "collect",
            "plural": "collects"
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
    static async all({ session, limit = null, since_id = null, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "limit": limit, "since_id": since_id, "fields": fields, ...otherArgs },
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
    collection_id;
    created_at;
    id;
    position;
    product_id;
    sort_value;
    updated_at;
}

export { Collect };
//# sourceMappingURL=collect.mjs.map
