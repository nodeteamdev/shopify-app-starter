'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Balance extends base.Base {
    static apiVersion = types.ApiVersion.July23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "get", "ids": [], "path": "shopify_payments/balance.json" }
    ];
    static resourceNames = [
        {
            "singular": "balance",
            "plural": "balances"
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
    balance;
}

exports.Balance = Balance;
//# sourceMappingURL=balance.js.map
