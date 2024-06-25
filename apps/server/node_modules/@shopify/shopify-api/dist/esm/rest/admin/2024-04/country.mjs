import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';
import { Province } from './province.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Country extends Base {
    static apiVersion = ApiVersion.April24;
    static hasOne = {};
    static hasMany = {
        "provinces": Province
    };
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "countries/<id>.json" },
        { "http_method": "get", "operation": "count", "ids": [], "path": "countries/count.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "countries.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "countries/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "countries.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "countries/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "country",
            "plural": "countries"
        }
    ];
    static async find({ session, id, fields = null }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "id": id },
            params: { "fields": fields },
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
    static async all({ session, since_id = null, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "since_id": since_id, "fields": fields, ...otherArgs },
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
    code;
    id;
    name;
    provinces;
    tax;
}

export { Country };
//# sourceMappingURL=country.mjs.map
