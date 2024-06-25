'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class ResourceFeedback extends base.Base {
    static apiVersion = types.ApiVersion.July23;
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

exports.ResourceFeedback = ResourceFeedback;
//# sourceMappingURL=resource_feedback.js.map
