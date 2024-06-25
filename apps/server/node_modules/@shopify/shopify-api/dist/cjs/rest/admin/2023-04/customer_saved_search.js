'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class CustomerSavedSearch extends base.Base {
    static apiVersion = types.ApiVersion.April23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "customer_saved_searches/<id>.json" },
        { "http_method": "get", "operation": "count", "ids": [], "path": "customer_saved_searches/count.json" },
        { "http_method": "get", "operation": "customers", "ids": ["id"], "path": "customer_saved_searches/<id>/customers.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "customer_saved_searches.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "customer_saved_searches/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "customer_saved_searches.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "customer_saved_searches/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "customer_saved_search",
            "plural": "customer_saved_searches"
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
    static async count({ session, since_id = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: {},
            params: { "since_id": since_id, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    static async customers({ session, id, order = null, limit = null, fields = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "customers",
            session: session,
            urlIds: { "id": id },
            params: { "order": order, "limit": limit, "fields": fields, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    created_at;
    id;
    name;
    query;
    updated_at;
}

exports.CustomerSavedSearch = CustomerSavedSearch;
//# sourceMappingURL=customer_saved_search.js.map
