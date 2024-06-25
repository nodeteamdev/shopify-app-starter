import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';
import { DiscountCode } from './discount_code.mjs';
import { Order } from './order.mjs';
import { GiftCard } from './gift_card.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Checkout extends Base {
    static apiVersion = ApiVersion.October22;
    static hasOne = {
        "discount_code": DiscountCode,
        "order": Order
    };
    static hasMany = {
        "gift_cards": GiftCard
    };
    static paths = [
        { "http_method": "get", "operation": "get", "ids": ["token"], "path": "checkouts/<token>.json" },
        { "http_method": "get", "operation": "shipping_rates", "ids": ["token"], "path": "checkouts/<token>/shipping_rates.json" },
        { "http_method": "post", "operation": "complete", "ids": ["token"], "path": "checkouts/<token>/complete.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "checkouts.json" },
        { "http_method": "put", "operation": "put", "ids": ["token"], "path": "checkouts/<token>.json" }
    ];
    static primaryKey = "token";
    static resourceNames = [
        {
            "singular": "checkout",
            "plural": "checkouts"
        }
    ];
    static async find({ session, token }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "token": token },
            params: {},
        });
        return result.data ? result.data[0] : null;
    }
    static async shipping_rates({ session, token, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "shipping_rates",
            session: session,
            urlIds: { "token": token },
            params: { ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    async complete({ body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "complete",
            session: this.session,
            urlIds: { "token": this.token },
            params: { ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    billing_address;
    line_items;
    applied_discount;
    buyer_accepts_marketing;
    created_at;
    currency;
    customer_id;
    discount_code;
    email;
    gift_cards;
    order;
    payment_due;
    payment_url;
    phone;
    presentment_currency;
    requires_shipping;
    reservation_time;
    reservation_time_left;
    shipping_address;
    shipping_line;
    shipping_rate;
    source_identifier;
    source_name;
    source_url;
    subtotal_price;
    tax_lines;
    taxes_included;
    token;
    total_price;
    total_tax;
    updated_at;
    user_id;
    web_url;
}

export { Checkout };
//# sourceMappingURL=checkout.mjs.map
