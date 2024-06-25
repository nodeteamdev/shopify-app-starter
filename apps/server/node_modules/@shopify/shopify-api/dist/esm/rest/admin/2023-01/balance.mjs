import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Balance extends Base {
    static apiVersion = ApiVersion.January23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "get", "ids": [], "path": "shopify_payments/balance.json" }
    ];
    static resourceNames = [
        {
            "singular": "balance",
            "plural": "balances"
        }
    ];
    static async all({ session, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { ...otherArgs },
        });
        return response;
    }
    balance;
}

export { Balance };
//# sourceMappingURL=balance.mjs.map
