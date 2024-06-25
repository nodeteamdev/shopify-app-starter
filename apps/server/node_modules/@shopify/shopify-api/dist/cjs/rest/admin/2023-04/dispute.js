'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Dispute extends base.Base {
    static apiVersion = types.ApiVersion.April23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "get", "ids": [], "path": "shopify_payments/disputes.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "shopify_payments/disputes/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "dispute",
            "plural": "disputes"
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
    static async all({ session, since_id = null, last_id = null, status = null, initiated_at = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "since_id": since_id, "last_id": last_id, "status": status, "initiated_at": initiated_at, ...otherArgs },
        });
        return response;
    }
    amount;
    currency;
    evidence_due_by;
    evidence_sent_on;
    finalized_on;
    id;
    network_reason_code;
    order_id;
    reason;
    status;
    type;
}

exports.Dispute = Dispute;
//# sourceMappingURL=dispute.js.map
