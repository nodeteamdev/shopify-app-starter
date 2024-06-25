import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class TenderTransaction extends Base {
    static apiVersion = ApiVersion.January24;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "get", "ids": [], "path": "tender_transactions.json" }
    ];
    static resourceNames = [
        {
            "singular": "tender_transaction",
            "plural": "tender_transactions"
        }
    ];
    static async all({ session, limit = null, since_id = null, processed_at_min = null, processed_at_max = null, processed_at = null, order = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "limit": limit, "since_id": since_id, "processed_at_min": processed_at_min, "processed_at_max": processed_at_max, "processed_at": processed_at, "order": order, ...otherArgs },
        });
        return response;
    }
    amount;
    currency;
    id;
    order_id;
    payment_details;
    payment_method;
    processed_at;
    remote_reference;
    test;
    user_id;
}

export { TenderTransaction };
//# sourceMappingURL=tender_transaction.mjs.map
