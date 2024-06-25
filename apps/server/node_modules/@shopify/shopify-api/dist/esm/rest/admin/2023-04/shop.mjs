import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Shop extends Base {
    static apiVersion = ApiVersion.April23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "get", "ids": [], "path": "shop.json" }
    ];
    static resourceNames = [
        {
            "singular": "shop",
            "plural": "shops"
        }
    ];
    static async current({ session, fields = null, ...otherArgs }) {
        const result = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "fields": fields, ...otherArgs },
        });
        return result.data ? result.data[0] : null;
    }
    static async all({ session, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "fields": fields, ...otherArgs },
        });
        return response;
    }
    address1;
    address2;
    checkout_api_supported;
    city;
    country;
    country_code;
    country_name;
    county_taxes;
    created_at;
    currency;
    customer_email;
    domain;
    eligible_for_card_reader_giveaway;
    eligible_for_payments;
    email;
    enabled_presentment_currencies;
    finances;
    force_ssl;
    google_apps_domain;
    google_apps_login_enabled;
    has_discounts;
    has_gift_cards;
    has_storefront;
    iana_timezone;
    id;
    latitude;
    longitude;
    marketing_sms_consent_enabled_at_checkout;
    money_format;
    money_in_emails_format;
    money_with_currency_format;
    money_with_currency_in_emails_format;
    multi_location_enabled;
    myshopify_domain;
    name;
    password_enabled;
    phone;
    plan_display_name;
    plan_name;
    pre_launch_enabled;
    primary_locale;
    primary_location_id;
    province;
    province_code;
    requires_extra_payments_agreement;
    setup_required;
    shop_owner;
    source;
    tax_shipping;
    taxes_included;
    timezone;
    transactional_sms_disabled;
    updated_at;
    weight_unit;
    zip;
}

export { Shop };
//# sourceMappingURL=shop.mjs.map
