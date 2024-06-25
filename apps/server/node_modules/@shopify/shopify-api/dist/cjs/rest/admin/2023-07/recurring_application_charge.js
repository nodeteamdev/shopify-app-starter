'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class RecurringApplicationCharge extends base.Base {
    static apiVersion = types.ApiVersion.July23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "recurring_application_charges/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "recurring_application_charges.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "recurring_application_charges/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "recurring_application_charges.json" },
        { "http_method": "put", "operation": "customize", "ids": ["id"], "path": "recurring_application_charges/<id>/customize.json" }
    ];
    static resourceNames = [
        {
            "singular": "recurring_application_charge",
            "plural": "recurring_application_charges"
        }
    ];
    static async find({ session, id, fields = null }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "id": id },
            params: { "fields": fields },
        });
        return result.data ? result.data[0] : null;
    }
    static async delete({ session, id }) {
        const response = await this.request({
            http_method: "delete",
            operation: "delete",
            session: session,
            urlIds: { "id": id },
            params: {},
        });
        return response ? response.body : null;
    }
    static async all({ session, since_id = null, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "since_id": since_id, "fields": fields, ...otherArgs },
        });
        return response;
    }
    async customize({ body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "put",
            operation: "customize",
            session: this.session,
            urlIds: { "id": this.id },
            params: { ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    activated_on;
    billing_on;
    cancelled_on;
    capped_amount;
    confirmation_url;
    created_at;
    currency;
    id;
    name;
    price;
    return_url;
    status;
    terms;
    test;
    trial_days;
    trial_ends_on;
    updated_at;
}

exports.RecurringApplicationCharge = RecurringApplicationCharge;
//# sourceMappingURL=recurring_application_charge.js.map
