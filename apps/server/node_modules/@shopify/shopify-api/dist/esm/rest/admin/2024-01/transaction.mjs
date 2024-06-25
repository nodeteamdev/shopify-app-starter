import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Transaction extends Base {
    static apiVersion = ApiVersion.January24;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "count", "ids": ["order_id"], "path": "orders/<order_id>/transactions/count.json" },
        { "http_method": "get", "operation": "get", "ids": ["order_id"], "path": "orders/<order_id>/transactions.json" },
        { "http_method": "get", "operation": "get", "ids": ["order_id", "id"], "path": "orders/<order_id>/transactions/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": ["order_id"], "path": "orders/<order_id>/transactions.json" }
    ];
    static resourceNames = [
        {
            "singular": "transaction",
            "plural": "transactions"
        }
    ];
    static async find({ session, id, order_id = null, fields = null, in_shop_currency = null }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "id": id, "order_id": order_id },
            params: { "fields": fields, "in_shop_currency": in_shop_currency },
        });
        return result.data ? result.data[0] : null;
    }
    static async all({ session, order_id = null, since_id = null, fields = null, in_shop_currency = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: { "order_id": order_id },
            params: { "since_id": since_id, "fields": fields, "in_shop_currency": in_shop_currency, ...otherArgs },
        });
        return response;
    }
    static async count({ session, order_id = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: { "order_id": order_id },
            params: { ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    kind;
    amount;
    authorization;
    authorization_expires_at;
    created_at;
    currency;
    currency_exchange_adjustment;
    device_id;
    error_code;
    extended_authorization_attributes;
    gateway;
    id;
    location_id;
    message;
    order_id;
    parent_id;
    payment_details;
    payments_refund_attributes;
    processed_at;
    receipt;
    source_name;
    status;
    test;
    total_unsettled_set;
    user_id;
}

export { Transaction };
//# sourceMappingURL=transaction.mjs.map
