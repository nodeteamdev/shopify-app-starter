import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Location extends Base {
    static apiVersion = ApiVersion.October23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "count", "ids": [], "path": "locations/count.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "locations.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "locations/<id>.json" },
        { "http_method": "get", "operation": "inventory_levels", "ids": ["id"], "path": "locations/<id>/inventory_levels.json" }
    ];
    static resourceNames = [
        {
            "singular": "location",
            "plural": "locations"
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
    static async all({ session, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { ...otherArgs },
        });
        return response;
    }
    static async count({ session, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: {},
            params: { ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    static async inventory_levels({ session, id, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "inventory_levels",
            session: session,
            urlIds: { "id": id },
            params: { ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    active;
    address1;
    address2;
    city;
    country;
    country_code;
    created_at;
    id;
    legacy;
    localized_country_name;
    localized_province_name;
    name;
    phone;
    province;
    province_code;
    updated_at;
    zip;
}

export { Location };
//# sourceMappingURL=location.mjs.map
