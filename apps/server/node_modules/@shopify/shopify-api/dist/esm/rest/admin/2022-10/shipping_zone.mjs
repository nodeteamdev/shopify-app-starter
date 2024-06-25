import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';
import { Country } from './country.mjs';
import { Province } from './province.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class ShippingZone extends Base {
    static apiVersion = ApiVersion.October22;
    static hasOne = {};
    static hasMany = {
        "countries": Country,
        "provinces": Province
    };
    static paths = [
        { "http_method": "get", "operation": "get", "ids": [], "path": "shipping_zones.json" }
    ];
    static resourceNames = [
        {
            "singular": "shipping_zone",
            "plural": "shipping_zones"
        }
    ];
    static async all({ session, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "fields": fields, ...otherArgs },
        });
        return response;
    }
    carrier_shipping_rate_providers;
    countries;
    id;
    location_group_id;
    name;
    price_based_shipping_rates;
    profile_id;
    provinces;
    weight_based_shipping_rates;
}

export { ShippingZone };
//# sourceMappingURL=shipping_zone.mjs.map
