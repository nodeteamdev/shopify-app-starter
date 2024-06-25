import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';
import { Currency } from './currency.mjs';
import { Customer } from './customer.mjs';
import { DiscountCode } from './discount_code.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class AbandonedCheckout extends Base {
    static apiVersion = ApiVersion.July23;
    static hasOne = {
        "currency": Currency,
        "customer": Customer
    };
    static hasMany = {
        "discount_codes": DiscountCode
    };
    static paths = [
        { "http_method": "get", "operation": "checkouts", "ids": [], "path": "checkouts.json" },
        { "http_method": "get", "operation": "checkouts", "ids": [], "path": "checkouts.json" }
    ];
    static resourceNames = [
        {
            "singular": "abandoned_checkout",
            "plural": "abandoned_checkouts"
        }
    ];
    static async checkouts({ session, since_id = null, created_at_min = null, created_at_max = null, updated_at_min = null, updated_at_max = null, status = null, limit = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "checkouts",
            session: session,
            urlIds: {},
            params: { "since_id": since_id, "created_at_min": created_at_min, "created_at_max": created_at_max, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, "status": status, "limit": limit, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    abandoned_checkout_url;
    billing_address;
    buyer_accepts_marketing;
    buyer_accepts_sms_marketing;
    cart_token;
    closed_at;
    completed_at;
    created_at;
    currency;
    customer;
    customer_locale;
    device_id;
    discount_codes;
    email;
    gateway;
    id;
    landing_site;
    line_items;
    location_id;
    note;
    phone;
    presentment_currency;
    referring_site;
    shipping_address;
    shipping_lines;
    sms_marketing_phone;
    source_name;
    subtotal_price;
    tax_lines;
    taxes_included;
    token;
    total_discounts;
    total_duties;
    total_line_items_price;
    total_price;
    total_tax;
    total_weight;
    updated_at;
    user_id;
}

export { AbandonedCheckout };
//# sourceMappingURL=abandoned_checkout.mjs.map
