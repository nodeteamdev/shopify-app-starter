import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Report extends Base {
    static apiVersion = ApiVersion.October22;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "reports/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "reports.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "reports/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "reports.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "reports/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "report",
            "plural": "reports"
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
    static async all({ session, ids = null, limit = null, since_id = null, updated_at_min = null, updated_at_max = null, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "ids": ids, "limit": limit, "since_id": since_id, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, "fields": fields, ...otherArgs },
        });
        return response;
    }
    category;
    id;
    name;
    shopify_ql;
    updated_at;
}

export { Report };
//# sourceMappingURL=report.mjs.map
