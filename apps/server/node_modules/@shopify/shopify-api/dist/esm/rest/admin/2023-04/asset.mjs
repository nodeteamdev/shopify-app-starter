import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Asset extends Base {
    static apiVersion = ApiVersion.April23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["theme_id"], "path": "themes/<theme_id>/assets.json" },
        { "http_method": "get", "operation": "get", "ids": ["theme_id"], "path": "themes/<theme_id>/assets.json" },
        { "http_method": "get", "operation": "get", "ids": ["theme_id"], "path": "themes/<theme_id>/assets.json" },
        { "http_method": "put", "operation": "put", "ids": ["theme_id"], "path": "themes/<theme_id>/assets.json" }
    ];
    static primaryKey = "key";
    static resourceNames = [
        {
            "singular": "asset",
            "plural": "assets"
        }
    ];
    static async delete({ session, theme_id = null, asset = null }) {
        const response = await this.request({
            http_method: "delete",
            operation: "delete",
            session: session,
            urlIds: { "theme_id": theme_id },
            params: { "asset": asset },
        });
        return response ? response.body : null;
    }
    static async all({ session, theme_id = null, fields = null, asset = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: { "theme_id": theme_id },
            params: { "fields": fields, "asset": asset, ...otherArgs },
        });
        return response;
    }
    attachment;
    checksum;
    content_type;
    created_at;
    key;
    public_url;
    size;
    theme_id;
    updated_at;
    value;
}

export { Asset };
//# sourceMappingURL=asset.mjs.map
