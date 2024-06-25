'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class LocationsForMove extends base.Base {
    static apiVersion = types.ApiVersion.October23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "get", "ids": ["fulfillment_order_id"], "path": "fulfillment_orders/<fulfillment_order_id>/locations_for_move.json" }
    ];
    static resourceNames = [
        {
            "singular": "locations_for_move",
            "plural": "locations_for_moves"
        }
    ];
    static async all({ session, fulfillment_order_id = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: { "fulfillment_order_id": fulfillment_order_id },
            params: { ...otherArgs },
        });
        return response;
    }
    locations_for_move;
}

exports.LocationsForMove = LocationsForMove;
//# sourceMappingURL=locations_for_move.js.map
