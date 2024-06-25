'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Webhook extends base.Base {
    static apiVersion = types.ApiVersion.October23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "webhooks/<id>.json" },
        { "http_method": "get", "operation": "count", "ids": [], "path": "webhooks/count.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "webhooks.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "webhooks/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "webhooks.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "webhooks/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "webhook",
            "plural": "webhooks"
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
    static async all({ session, address = null, created_at_max = null, created_at_min = null, fields = null, limit = null, since_id = null, topic = null, updated_at_min = null, updated_at_max = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "address": address, "created_at_max": created_at_max, "created_at_min": created_at_min, "fields": fields, "limit": limit, "since_id": since_id, "topic": topic, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, ...otherArgs },
        });
        return response;
    }
    static async count({ session, address = null, topic = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: {},
            params: { "address": address, "topic": topic, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    address;
    topic;
    api_version;
    created_at;
    fields;
    format;
    id;
    metafield_namespaces;
    private_metafield_namespaces;
    updated_at;
}

exports.Webhook = Webhook;
//# sourceMappingURL=webhook.js.map
