import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class MobilePlatformApplication extends Base {
    static apiVersion = ApiVersion.April23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "mobile_platform_applications/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "mobile_platform_applications.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "mobile_platform_applications/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "mobile_platform_applications.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "mobile_platform_applications/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "mobile_platform_application",
            "plural": "mobile_platform_applications"
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
    application_id;
    enabled_shared_webcredentials;
    enabled_universal_or_app_links;
    id;
    platform;
    sha256_cert_fingerprints;
}

export { MobilePlatformApplication };
//# sourceMappingURL=mobile_platform_application.mjs.map
