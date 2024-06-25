import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class ProductResourceFeedback extends Base {
    static apiVersion = ApiVersion.April24;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "get", "ids": ["product_id"], "path": "products/<product_id>/resource_feedback.json" },
        { "http_method": "post", "operation": "post", "ids": ["product_id"], "path": "products/<product_id>/resource_feedback.json" }
    ];
    static resourceNames = [
        {
            "singular": "product_resource_feedback",
            "plural": "product_resource_feedbacks"
        }
    ];
    static getJsonBodyName() {
        return "resource_feedback";
    }
    static async all({ session, product_id = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: { "product_id": product_id },
            params: { ...otherArgs },
        });
        return response;
    }
    created_at;
    feedback_generated_at;
    messages;
    product_id;
    resource_id;
    resource_type;
    resource_updated_at;
    state;
    updated_at;
}

export { ProductResourceFeedback };
//# sourceMappingURL=product_resource_feedback.mjs.map
