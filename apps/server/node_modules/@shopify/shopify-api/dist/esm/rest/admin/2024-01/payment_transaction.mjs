import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';
import { Currency } from './currency.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class PaymentTransaction extends Base {
    static apiVersion = ApiVersion.January24;
    static hasOne = {
        "currency": Currency
    };
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "transactions", "ids": [], "path": "shopify_payments/balance/transactions.json" }
    ];
    static resourceNames = [
        {
            "singular": "payment_transaction",
            "plural": "payment_transactions"
        }
    ];
    static async transactions({ session, since_id = null, last_id = null, test = null, payout_id = null, payout_status = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "transactions",
            session: session,
            urlIds: {},
            params: { "since_id": since_id, "last_id": last_id, "test": test, "payout_id": payout_id, "payout_status": payout_status, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    adjustment_order_transactions;
    amount;
    currency;
    fee;
    id;
    net;
    payout_id;
    payout_status;
    processed_at;
    source_id;
    source_order_id;
    source_order_transaction_id;
    source_type;
    test;
    type;
}

export { PaymentTransaction };
//# sourceMappingURL=payment_transaction.mjs.map
