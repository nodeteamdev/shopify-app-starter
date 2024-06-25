'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class FulfillmentService extends base.Base {
    static apiVersion = types.ApiVersion.October23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "fulfillment_services/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "fulfillment_services.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "fulfillment_services/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "fulfillment_services.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "fulfillment_services/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "fulfillment_service",
            "plural": "fulfillment_services"
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
    static async delete({ session, id }) {
        const response = await this.request({
            http_method: "delete",
            operation: "delete",
            session: session,
            urlIds: { "id": id },
            params: {},
        });
        return response ? response.body : null;
    }
    static async all({ session, scope = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "scope": scope, ...otherArgs },
        });
        return response;
    }
    admin_graphql_api_id;
    callback_url;
    fulfillment_orders_opt_in;
    handle;
    id;
    inventory_management;
    location_id;
    name;
    permits_sku_sharing;
    provider_id;
    requires_shipping_method;
    tracking_support;
}

exports.FulfillmentService = FulfillmentService;
//# sourceMappingURL=fulfillment_service.js.map
