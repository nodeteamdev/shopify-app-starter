import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class AssignedFulfillmentOrder extends Base {
    static apiVersion = ApiVersion.July23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "get", "ids": [], "path": "assigned_fulfillment_orders.json" }
    ];
    static resourceNames = [
        {
            "singular": "fulfillment_order",
            "plural": "fulfillment_orders"
        }
    ];
    static async all({ session, assignment_status = null, location_ids = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "assignment_status": assignment_status, "location_ids": location_ids, ...otherArgs },
        });
        return response;
    }
    assigned_location_id;
    destination;
    id;
    line_items;
    order_id;
    request_status;
    shop_id;
    status;
}

export { AssignedFulfillmentOrder };
//# sourceMappingURL=assigned_fulfillment_order.mjs.map
