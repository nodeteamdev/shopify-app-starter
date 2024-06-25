'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class AndroidPayKey extends base.Base {
    static apiVersion = types.ApiVersion.October22;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "android_pay_keys/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "android_pay_keys/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "android_pay_keys.json" }
    ];
    static resourceNames = [
        {
            "singular": "android_pay_key",
            "plural": "android_pay_keys"
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
    id;
    public_key;
}

exports.AndroidPayKey = AndroidPayKey;
//# sourceMappingURL=android_pay_key.js.map
