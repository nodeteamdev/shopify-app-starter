import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class InventoryLevel extends Base {
    static apiVersion = ApiVersion.April23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": [], "path": "inventory_levels.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "inventory_levels.json" },
        { "http_method": "post", "operation": "adjust", "ids": [], "path": "inventory_levels/adjust.json" },
        { "http_method": "post", "operation": "connect", "ids": [], "path": "inventory_levels/connect.json" },
        { "http_method": "post", "operation": "set", "ids": [], "path": "inventory_levels/set.json" }
    ];
    static resourceNames = [
        {
            "singular": "inventory_level",
            "plural": "inventory_levels"
        }
    ];
    static async delete({ session, inventory_item_id = null, location_id = null }) {
        const response = await this.request({
            http_method: "delete",
            operation: "delete",
            session: session,
            urlIds: {},
            params: { "inventory_item_id": inventory_item_id, "location_id": location_id },
        });
        return response ? response.body : null;
    }
    static async all({ session, inventory_item_ids = null, location_ids = null, limit = null, updated_at_min = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "inventory_item_ids": inventory_item_ids, "location_ids": location_ids, "limit": limit, "updated_at_min": updated_at_min, ...otherArgs },
        });
        return response;
    }
    async adjust({ inventory_item_id = null, location_id = null, available_adjustment = null, body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "adjust",
            session: this.session,
            urlIds: {},
            params: { "inventory_item_id": inventory_item_id, "location_id": location_id, "available_adjustment": available_adjustment, ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    async connect({ inventory_item_id = null, location_id = null, relocate_if_necessary = null, body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "connect",
            session: this.session,
            urlIds: {},
            params: { "inventory_item_id": inventory_item_id, "location_id": location_id, "relocate_if_necessary": relocate_if_necessary, ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    async set({ inventory_item_id = null, location_id = null, available = null, disconnect_if_necessary = null, body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "set",
            session: this.session,
            urlIds: {},
            params: { "inventory_item_id": inventory_item_id, "location_id": location_id, "available": available, "disconnect_if_necessary": disconnect_if_necessary, ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    available;
    inventory_item_id;
    location_id;
    updated_at;
}

export { InventoryLevel };
//# sourceMappingURL=inventory_level.mjs.map
