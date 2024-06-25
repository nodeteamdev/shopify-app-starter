import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';
import { Transaction } from './transaction.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Refund extends Base {
    static apiVersion = ApiVersion.April24;
    static hasOne = {};
    static hasMany = {
        "transactions": Transaction
    };
    static paths = [
        { "http_method": "get", "operation": "get", "ids": ["order_id"], "path": "orders/<order_id>/refunds.json" },
        { "http_method": "get", "operation": "get", "ids": ["order_id", "id"], "path": "orders/<order_id>/refunds/<id>.json" },
        { "http_method": "post", "operation": "calculate", "ids": ["order_id"], "path": "orders/<order_id>/refunds/calculate.json" },
        { "http_method": "post", "operation": "post", "ids": ["order_id"], "path": "orders/<order_id>/refunds.json" }
    ];
    static resourceNames = [
        {
            "singular": "refund",
            "plural": "refunds"
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
    static async all({ session, order_id = null, limit = null, fields = null, in_shop_currency = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: { "order_id": order_id },
            params: { "limit": limit, "fields": fields, "in_shop_currency": in_shop_currency, ...otherArgs },
        });
        return response;
    }
    async calculate({ shipping = null, refund_line_items = null, currency = null, body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "calculate",
            session: this.session,
            urlIds: { "order_id": this.order_id },
            params: { "shipping": shipping, "refund_line_items": refund_line_items, "currency": currency, ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    created_at;
    duties;
    id;
    note;
    order_adjustments;
    order_id;
    processed_at;
    refund_duties;
    refund_line_items;
    restock;
    transactions;
    user_id;
}

export { Refund };
//# sourceMappingURL=refund.mjs.map
