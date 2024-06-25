import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class AccessScope extends Base {
    static apiVersion = ApiVersion.April24;
    static hasOne = {};
    static hasMany = {};
    static customPrefix = "/admin/oauth";
    static paths = [
        { "http_method": "get", "operation": "get", "ids": [], "path": "access_scopes.json" }
    ];
    static resourceNames = [
        {
            "singular": "access_scope",
            "plural": "access_scopes"
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
    handle;
    access_scopes;
}

export { AccessScope };
//# sourceMappingURL=access_scope.mjs.map
