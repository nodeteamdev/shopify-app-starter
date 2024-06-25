'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');
var metafield = require('./metafield.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Blog extends base.Base {
    static apiVersion = types.ApiVersion.January24;
    static hasOne = {};
    static hasMany = {
        "metafields": metafield.Metafield
    };
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "blogs/<id>.json" },
        { "http_method": "get", "operation": "count", "ids": [], "path": "blogs/count.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "blogs.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "blogs/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "blogs.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "blogs/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "blog",
            "plural": "blogs"
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
    static async all({ session, limit = null, since_id = null, handle = null, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "limit": limit, "since_id": since_id, "handle": handle, "fields": fields, ...otherArgs },
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
    admin_graphql_api_id;
    commentable;
    created_at;
    feedburner;
    feedburner_location;
    handle;
    id;
    metafields;
    tags;
    template_suffix;
    title;
    updated_at;
}

exports.Blog = Blog;
//# sourceMappingURL=blog.js.map
