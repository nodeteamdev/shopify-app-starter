import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';
import { Currency } from './currency.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class ApplicationCredit extends Base {
    static apiVersion = ApiVersion.April23;
    static hasOne = {
        "currency": Currency
    };
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "get", "ids": [], "path": "application_credits.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "application_credits/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "application_credits.json" }
    ];
    static resourceNames = [
        {
            "singular": "application_credit",
            "plural": "application_credits"
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
    static async all({ session, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "fields": fields, ...otherArgs },
        });
        return response;
    }
    amount;
    currency;
    description;
    id;
    test;
}

export { ApplicationCredit };
//# sourceMappingURL=application_credit.mjs.map
