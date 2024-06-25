'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class CarrierService extends base.Base {
    static apiVersion = types.ApiVersion.October22;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "carrier_services/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "carrier_services.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "carrier_services/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "carrier_services.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "carrier_services/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "carrier_service",
            "plural": "carrier_services"
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
    static async all({ session, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { ...otherArgs },
        });
        return response;
    }
    active;
    admin_graphql_api_id;
    callback_url;
    carrier_service_type;
    format;
    id;
    name;
    service_discovery;
}

exports.CarrierService = CarrierService;
//# sourceMappingURL=carrier_service.js.map
