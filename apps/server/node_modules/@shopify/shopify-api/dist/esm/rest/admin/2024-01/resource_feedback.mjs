import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class ResourceFeedback extends Base {
    static apiVersion = ApiVersion.January24;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "get", "ids": [], "path": "resource_feedback.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "resource_feedback.json" }
    ];
    static resourceNames = [
        {
            "singular": "resource_feedback",
            "plural": "resource_feedbacks"
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
    created_at;
    feedback_generated_at;
    messages;
    resource_id;
    resource_type;
    state;
    updated_at;
}

export { ResourceFeedback };
//# sourceMappingURL=resource_feedback.mjs.map
