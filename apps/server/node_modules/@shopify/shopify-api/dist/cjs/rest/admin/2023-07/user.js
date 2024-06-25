'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class User extends base.Base {
    static apiVersion = types.ApiVersion.July23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "current", "ids": [], "path": "users/current.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "users.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "users/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "user",
            "plural": "users"
        }
    ];
    static async find({ session, id }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "id": id },
            params: {},
        });
        return result.data ? result.data[0] : null;
    }
    static async all({ session, limit = null, page_info = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "limit": limit, "page_info": page_info, ...otherArgs },
        });
        return response;
    }
    static async current({ session, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "current",
            session: session,
            urlIds: {},
            params: { ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    account_owner;
    bio;
    email;
    first_name;
    id;
    im;
    last_name;
    locale;
    permissions;
    phone;
    receive_announcements;
    screen_name;
    url;
    user_type;
}

exports.User = User;
//# sourceMappingURL=user.js.map
