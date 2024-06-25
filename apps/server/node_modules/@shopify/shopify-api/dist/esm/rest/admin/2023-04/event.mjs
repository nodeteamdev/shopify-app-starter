import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Event extends Base {
    static apiVersion = ApiVersion.April23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "count", "ids": [], "path": "events/count.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "events.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "events/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": ["order_id"], "path": "orders/<order_id>/events.json" },
        { "http_method": "get", "operation": "get", "ids": ["product_id"], "path": "products/<product_id>/events.json" }
    ];
    static resourceNames = [
        {
            "singular": "event",
            "plural": "events"
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
    static async all({ session, order_id = null, product_id = null, limit = null, since_id = null, created_at_min = null, created_at_max = null, filter = null, verb = null, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: { "order_id": order_id, "product_id": product_id },
            params: { "limit": limit, "since_id": since_id, "created_at_min": created_at_min, "created_at_max": created_at_max, "filter": filter, "verb": verb, "fields": fields, ...otherArgs },
        });
        return response;
    }
    static async count({ session, created_at_min = null, created_at_max = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: {},
            params: { "created_at_min": created_at_min, "created_at_max": created_at_max, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    arguments;
    body;
    created_at;
    description;
    id;
    message;
    path;
    subject_id;
    subject_type;
    verb;
}

export { Event };
//# sourceMappingURL=event.mjs.map
