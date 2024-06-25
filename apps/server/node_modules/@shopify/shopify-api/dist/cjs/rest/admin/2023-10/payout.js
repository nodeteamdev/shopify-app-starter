'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Payout extends base.Base {
    static apiVersion = types.ApiVersion.October23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "get", "ids": [], "path": "shopify_payments/payouts.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "shopify_payments/payouts/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "payout",
            "plural": "payouts"
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
    static async all({ session, since_id = null, last_id = null, date_min = null, date_max = null, date = null, status = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "since_id": since_id, "last_id": last_id, "date_min": date_min, "date_max": date_max, "date": date, "status": status, ...otherArgs },
        });
        return response;
    }
    amount;
    currency;
    date;
    id;
    status;
}

exports.Payout = Payout;
//# sourceMappingURL=payout.js.map
