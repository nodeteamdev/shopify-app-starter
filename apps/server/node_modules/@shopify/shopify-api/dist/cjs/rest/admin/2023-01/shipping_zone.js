'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');
var country = require('./country.js');
var province = require('./province.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class ShippingZone extends base.Base {
    static apiVersion = types.ApiVersion.January23;
    static hasOne = {};
    static hasMany = {
        "countries": country.Country,
        "provinces": province.Province
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

exports.ShippingZone = ShippingZone;
//# sourceMappingURL=shipping_zone.js.map
