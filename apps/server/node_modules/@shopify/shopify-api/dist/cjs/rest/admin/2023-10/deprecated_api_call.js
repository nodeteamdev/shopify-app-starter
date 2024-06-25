'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class DeprecatedApiCall extends base.Base {
    static apiVersion = types.ApiVersion.October23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "get", "ids": [], "path": "deprecated_api_calls.json" }
    ];
    static resourceNames = [
        {
            "singular": "deprecated_api_call",
            "plural": "deprecated_api_calls"
        }
    ];
    static async all({ session, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { ...otherArgs },
        });
        return response;
    }
    data_updated_at;
    deprecated_api_calls;
}

exports.DeprecatedApiCall = DeprecatedApiCall;
//# sourceMappingURL=deprecated_api_call.js.map
