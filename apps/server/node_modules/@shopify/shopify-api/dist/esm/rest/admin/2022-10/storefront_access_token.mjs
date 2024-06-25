import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class StorefrontAccessToken extends Base {
    static apiVersion = ApiVersion.October22;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "storefront_access_tokens/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "storefront_access_tokens.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "storefront_access_tokens.json" }
    ];
    static resourceNames = [
        {
            "singular": "storefront_access_token",
            "plural": "storefront_access_tokens"
        }
    ];
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
    title;
    access_scope;
    access_token;
    created_at;
    id;
}

export { StorefrontAccessToken };
//# sourceMappingURL=storefront_access_token.mjs.map
