import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Redirect extends Base {
    static apiVersion = ApiVersion.January24;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "redirects/<id>.json" },
        { "http_method": "get", "operation": "count", "ids": [], "path": "redirects/count.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "redirects.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "redirects/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "redirects.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "redirects/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "redirect",
            "plural": "redirects"
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
    static async all({ session, limit = null, since_id = null, path = null, target = null, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "limit": limit, "since_id": since_id, "path": path, "target": target, "fields": fields, ...otherArgs },
        });
        return response;
    }
    static async count({ session, path = null, target = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: {},
            params: { "path": path, "target": target, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    id;
    path;
    target;
}

export { Redirect };
//# sourceMappingURL=redirect.mjs.map
