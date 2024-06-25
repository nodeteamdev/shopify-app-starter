import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class GiftCardAdjustment extends Base {
    static apiVersion = ApiVersion.July23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "get", "ids": ["gift_card_id"], "path": "gift_cards/<gift_card_id>/adjustments.json" },
        { "http_method": "get", "operation": "get", "ids": ["gift_card_id", "id"], "path": "gift_cards/<gift_card_id>/adjustments/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": ["gift_card_id"], "path": "gift_cards/<gift_card_id>/adjustments.json" }
    ];
    static resourceNames = [
        {
            "singular": "gift_card_adjustment",
            "plural": "gift_card_adjustments"
        }
    ];
    static getJsonBodyName() {
        return "adjustment";
    }
    static async find({ session, id, gift_card_id = null }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "id": id, "gift_card_id": gift_card_id },
            params: {},
        });
        return result.data ? result.data[0] : null;
    }
    static async all({ session, gift_card_id = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: { "gift_card_id": gift_card_id },
            params: { ...otherArgs },
        });
        return response;
    }
    amount;
    api_client_id;
    created_at;
    gift_card_id;
    id;
    note;
    number;
    order_transaction_id;
    processed_at;
    remote_transaction_ref;
    remote_transaction_url;
    user_id;
}

export { GiftCardAdjustment };
//# sourceMappingURL=gift_card_adjustment.mjs.map
