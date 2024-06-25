'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class GiftCard extends base.Base {
    static apiVersion = types.ApiVersion.October23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "count", "ids": [], "path": "gift_cards/count.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "gift_cards.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "gift_cards/<id>.json" },
        { "http_method": "get", "operation": "search", "ids": [], "path": "gift_cards/search.json" },
        { "http_method": "post", "operation": "disable", "ids": ["id"], "path": "gift_cards/<id>/disable.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "gift_cards.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "gift_cards/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "gift_card",
            "plural": "gift_cards"
        }
    ];
    static async find({ session, id }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "id": id },
            params: {},
        });
        return result.data ? result.data[0] : null;
    }
    static async all({ session, status = null, limit = null, since_id = null, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "status": status, "limit": limit, "since_id": since_id, "fields": fields, ...otherArgs },
        });
        return response;
    }
    static async count({ session, status = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: {},
            params: { "status": status, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    static async search({ session, order = null, query = null, limit = null, fields = null, created_at_min = null, created_at_max = null, updated_at_min = null, updated_at_max = null, returnFullResponse = false, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "search",
            session: session,
            urlIds: {},
            params: { "order": order, "query": query, "limit": limit, "fields": fields, "created_at_min": created_at_min, "created_at_max": created_at_max, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, ...otherArgs },
            body: {},
            entity: null,
        });
        return returnFullResponse ? response : response?.body;
    }
    async disable({ body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "disable",
            session: this.session,
            urlIds: { "id": this.id },
            params: { ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    api_client_id;
    balance;
    code;
    created_at;
    currency;
    customer_id;
    disabled_at;
    expires_on;
    id;
    initial_value;
    last_characters;
    line_item_id;
    note;
    order_id;
    template_suffix;
    updated_at;
    user_id;
}

exports.GiftCard = GiftCard;
//# sourceMappingURL=gift_card.js.map
