'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Province extends base.Base {
    static apiVersion = types.ApiVersion.January23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "count", "ids": ["country_id"], "path": "countries/<country_id>/provinces/count.json" },
        { "http_method": "get", "operation": "get", "ids": ["country_id"], "path": "countries/<country_id>/provinces.json" },
        { "http_method": "get", "operation": "get", "ids": ["country_id", "id"], "path": "countries/<country_id>/provinces/<id>.json" },
        { "http_method": "put", "operation": "put", "ids": ["country_id", "id"], "path": "countries/<country_id>/provinces/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "province",
            "plural": "provinces"
        }
    ];
    static async find({ session, id, country_id = null, fields = null }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "id": id, "country_id": country_id },
            params: { "fields": fields },
        });
        return result.data ? result.data[0] : null;
    }
    static async all({ session, country_id = null, since_id = null, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: { "country_id": country_id },
            params: { "since_id": since_id, "fields": fields, ...otherArgs },
        });
        return response;
    }
    static async count({ session, country_id = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: { "country_id": country_id },
            params: { ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    code;
    country_id;
    id;
    name;
    shipping_zone_id;
    tax;
    tax_name;
    tax_percentage;
    tax_type;
}

exports.Province = Province;
//# sourceMappingURL=province.js.map
