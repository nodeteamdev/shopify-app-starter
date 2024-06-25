'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Theme extends base.Base {
    static apiVersion = types.ApiVersion.January24;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "themes/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "themes.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "themes/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "themes.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "themes/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "theme",
            "plural": "themes"
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
    static async all({ session, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "fields": fields, ...otherArgs },
        });
        return response;
    }
    created_at;
    id;
    name;
    previewable;
    processing;
    role;
    src;
    theme_store_id;
    updated_at;
}

exports.Theme = Theme;
//# sourceMappingURL=theme.js.map
