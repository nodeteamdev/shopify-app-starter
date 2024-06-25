import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class OrderRisk extends Base {
    static apiVersion = ApiVersion.October23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["order_id", "id"], "path": "orders/<order_id>/risks/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": ["order_id"], "path": "orders/<order_id>/risks.json" },
        { "http_method": "get", "operation": "get", "ids": ["order_id", "id"], "path": "orders/<order_id>/risks/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": ["order_id"], "path": "orders/<order_id>/risks.json" },
        { "http_method": "put", "operation": "put", "ids": ["order_id", "id"], "path": "orders/<order_id>/risks/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "risk",
            "plural": "risks"
        }
    ];
    static getJsonBodyName() {
        return "risk";
    }
    static async find({ session, id, order_id = null }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "id": id, "order_id": order_id },
            params: {},
        });
        return result.data ? result.data[0] : null;
    }
    static async delete({ session, id, order_id = null }) {
        const response = await this.request({
            http_method: "delete",
            operation: "delete",
            session: session,
            urlIds: { "id": id, "order_id": order_id },
            params: {},
        });
        return response ? response.body : null;
    }
    static async all({ session, order_id = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: { "order_id": order_id },
            params: { ...otherArgs },
        });
        return response;
    }
    cause_cancel;
    checkout_id;
    display;
    id;
    merchant_message;
    message;
    order_id;
    recommendation;
    score;
    source;
}

export { OrderRisk };
//# sourceMappingURL=order_risk.mjs.map
