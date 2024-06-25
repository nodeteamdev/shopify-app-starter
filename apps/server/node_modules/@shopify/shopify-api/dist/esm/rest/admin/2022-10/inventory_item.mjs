import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class InventoryItem extends Base {
    static apiVersion = ApiVersion.October22;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "get", "ids": [], "path": "inventory_items.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "inventory_items/<id>.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "inventory_items/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "inventory_item",
            "plural": "inventory_items"
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
    static async all({ session, ids = null, limit = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "ids": ids, "limit": limit, ...otherArgs },
        });
        return response;
    }
    cost;
    country_code_of_origin;
    country_harmonized_system_codes;
    created_at;
    harmonized_system_code;
    id;
    province_code_of_origin;
    requires_shipping;
    sku;
    tracked;
    updated_at;
}

export { InventoryItem };
//# sourceMappingURL=inventory_item.mjs.map
