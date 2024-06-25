'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class ScriptTag extends base.Base {
    static apiVersion = types.ApiVersion.April23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "script_tags/<id>.json" },
        { "http_method": "get", "operation": "count", "ids": [], "path": "script_tags/count.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "script_tags.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "script_tags/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "script_tags.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "script_tags/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "script_tag",
            "plural": "script_tags"
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
    static async all({ session, limit = null, since_id = null, created_at_min = null, created_at_max = null, updated_at_min = null, updated_at_max = null, src = null, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "limit": limit, "since_id": since_id, "created_at_min": created_at_min, "created_at_max": created_at_max, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, "src": src, "fields": fields, ...otherArgs },
        });
        return response;
    }
    static async count({ session, src = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: {},
            params: { "src": src, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    event;
    src;
    cache;
    created_at;
    display_scope;
    id;
    updated_at;
}

exports.ScriptTag = ScriptTag;
//# sourceMappingURL=script_tag.js.map
