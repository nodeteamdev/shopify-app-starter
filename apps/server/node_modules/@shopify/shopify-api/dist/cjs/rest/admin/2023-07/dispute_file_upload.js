'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class DisputeFileUpload extends base.Base {
    static apiVersion = types.ApiVersion.July23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["dispute_id", "id"], "path": "shopify_payments/disputes/<dispute_id>/dispute_file_uploads/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": ["dispute_id"], "path": "shopify_payments/disputes/<dispute_id>/dispute_file_uploads.json" }
    ];
    static resourceNames = [
        {
            "singular": "dispute_file_upload",
            "plural": "dispute_file_uploads"
        }
    ];
    static async delete({ session, id, dispute_id = null }) {
        const response = await this.request({
            http_method: "delete",
            operation: "delete",
            session: session,
            urlIds: { "id": id, "dispute_id": dispute_id },
            params: {},
        });
        return response ? response.body : null;
    }
    dispute_evidence_id;
    dispute_evidence_type;
    file_size;
    file_type;
    filename;
    id;
    original_filename;
    shop_id;
    url;
}

exports.DisputeFileUpload = DisputeFileUpload;
//# sourceMappingURL=dispute_file_upload.js.map
