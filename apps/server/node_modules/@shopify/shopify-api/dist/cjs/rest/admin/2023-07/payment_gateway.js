'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class PaymentGateway extends base.Base {
    static apiVersion = types.ApiVersion.July23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "payment_gateways/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "payment_gateways.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "payment_gateways/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "payment_gateways.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "payment_gateways/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "payment_gateway",
            "plural": "payment_gateways"
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
    attachment;
    created_at;
    credential1;
    credential2;
    credential3;
    credential4;
    disabled;
    enabled_card_brands;
    id;
    name;
    processing_method;
    provider_id;
    sandbox;
    service_name;
    supports_network_tokenization;
    type;
    updated_at;
}

exports.PaymentGateway = PaymentGateway;
//# sourceMappingURL=payment_gateway.js.map
