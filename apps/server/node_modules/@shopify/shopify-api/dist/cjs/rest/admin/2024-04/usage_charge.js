'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');
var currency = require('./currency.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class UsageCharge extends base.Base {
    static apiVersion = types.ApiVersion.April24;
    static hasOne = {
        "currency": currency.Currency
    };
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "get", "ids": ["recurring_application_charge_id"], "path": "recurring_application_charges/<recurring_application_charge_id>/usage_charges.json" },
        { "http_method": "get", "operation": "get", "ids": ["recurring_application_charge_id", "id"], "path": "recurring_application_charges/<recurring_application_charge_id>/usage_charges/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": ["recurring_application_charge_id"], "path": "recurring_application_charges/<recurring_application_charge_id>/usage_charges.json" }
    ];
    static resourceNames = [
        {
            "singular": "usage_charge",
            "plural": "usage_charges"
        }
    ];
    static async find({ session, id, recurring_application_charge_id = null, fields = null }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "id": id, "recurring_application_charge_id": recurring_application_charge_id },
            params: { "fields": fields },
        });
        return result.data ? result.data[0] : null;
    }
    static async all({ session, recurring_application_charge_id = null, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: { "recurring_application_charge_id": recurring_application_charge_id },
            params: { "fields": fields, ...otherArgs },
        });
        return response;
    }
    created_at;
    currency;
    description;
    id;
    price;
    recurring_application_charge_id;
    updated_at;
}

exports.UsageCharge = UsageCharge;
//# sourceMappingURL=usage_charge.js.map
