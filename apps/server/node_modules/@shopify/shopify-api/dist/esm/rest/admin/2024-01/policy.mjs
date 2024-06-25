import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Policy extends Base {
    static apiVersion = ApiVersion.January24;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "get", "ids": [], "path": "policies.json" }
    ];
    static resourceNames = [
        {
            "singular": "policy",
            "plural": "policies"
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
    body;
    created_at;
    handle;
    title;
    updated_at;
    url;
}

export { Policy };
//# sourceMappingURL=policy.mjs.map
