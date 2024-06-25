import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';
import { Fulfillment } from './fulfillment.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class DisputeEvidence extends Base {
    static apiVersion = ApiVersion.October23;
    static hasOne = {};
    static hasMany = {
        "fulfillments": Fulfillment
    };
    static paths = [
        { "http_method": "get", "operation": "get", "ids": ["dispute_id"], "path": "shopify_payments/disputes/<dispute_id>/dispute_evidences.json" },
        { "http_method": "put", "operation": "put", "ids": ["dispute_id"], "path": "shopify_payments/disputes/<dispute_id>/dispute_evidences.json" }
    ];
    static primaryKey = "dispute_id";
    static resourceNames = [
        {
            "singular": "dispute_evidence",
            "plural": "dispute_evidences"
        }
    ];
    static async find({ session, dispute_id }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "dispute_id": dispute_id },
            params: {},
        });
        return result.data ? result.data[0] : null;
    }
    access_activity_log;
    billing_address;
    cancellation_policy_disclosure;
    cancellation_rebuttal;
    created_at;
    customer_email_address;
    customer_first_name;
    customer_last_name;
    dispute_evidence_files;
    fulfillments;
    id;
    payments_dispute_id;
    product_description;
    refund_policy_disclosure;
    refund_refusal_explanation;
    shipping_address;
    submitted;
    uncategorized_text;
    updated_on;
}

export { DisputeEvidence };
//# sourceMappingURL=dispute_evidence.mjs.map
