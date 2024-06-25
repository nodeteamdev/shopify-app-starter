import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class ApplePayCertificate extends Base {
    static apiVersion = ApiVersion.April23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "apple_pay_certificates/<id>.json" },
        { "http_method": "get", "operation": "csr", "ids": ["id"], "path": "apple_pay_certificates/<id>/csr.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "apple_pay_certificates/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "apple_pay_certificates.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "apple_pay_certificates/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "apple_pay_certificate",
            "plural": "apple_pay_certificates"
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
    static async csr({ session, id, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "csr",
            session: session,
            urlIds: { "id": id },
            params: { ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    id;
    merchant_id;
    status;
}

export { ApplePayCertificate };
//# sourceMappingURL=apple_pay_certificate.mjs.map
