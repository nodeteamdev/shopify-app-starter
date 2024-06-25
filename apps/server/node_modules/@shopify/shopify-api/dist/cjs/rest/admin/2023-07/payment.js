'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');
var transaction = require('./transaction.js');
var checkout = require('./checkout.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Payment extends base.Base {
    static apiVersion = types.ApiVersion.July23;
    static hasOne = {
        "transaction": transaction.Transaction,
        "checkout": checkout.Checkout
    };
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "count", "ids": ["checkout_id"], "path": "checkouts/<checkout_id>/payments/count.json" },
        { "http_method": "get", "operation": "get", "ids": ["checkout_id"], "path": "checkouts/<checkout_id>/payments.json" },
        { "http_method": "get", "operation": "get", "ids": ["checkout_id", "id"], "path": "checkouts/<checkout_id>/payments/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": ["checkout_id"], "path": "checkouts/<checkout_id>/payments.json" }
    ];
    static resourceNames = [
        {
            "singular": "payment",
            "plural": "payments"
        }
    ];
    static async find({ session, id, checkout_id = null }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "id": id, "checkout_id": checkout_id },
            params: {},
        });
        return result.data ? result.data[0] : null;
    }
    static async all({ session, checkout_id = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: { "checkout_id": checkout_id },
            params: { ...otherArgs },
        });
        return response;
    }
    static async count({ session, checkout_id = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: { "checkout_id": checkout_id },
            params: { ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    checkout;
    credit_card;
    id;
    next_action;
    payment_processing_error_message;
    transaction;
    unique_token;
}

exports.Payment = Payment;
//# sourceMappingURL=payment.js.map
