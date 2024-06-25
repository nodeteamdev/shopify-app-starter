'use strict';

var base = require('../../base.js');
var types = require('../../../lib/types.js');

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class MarketingEvent extends base.Base {
    static apiVersion = types.ApiVersion.April23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "marketing_events/<id>.json" },
        { "http_method": "get", "operation": "count", "ids": [], "path": "marketing_events/count.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "marketing_events.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "marketing_events/<id>.json" },
        { "http_method": "post", "operation": "engagements", "ids": ["id"], "path": "marketing_events/<id>/engagements.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "marketing_events.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "marketing_events/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "marketing_event",
            "plural": "marketing_events"
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
    static async all({ session, limit = null, offset = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "limit": limit, "offset": offset, ...otherArgs },
        });
        return response;
    }
    static async count({ session, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: {},
            params: { ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    async engagements({ occurred_on = null, impressions_count = null, views_count = null, clicks_count = null, shares_count = null, favorites_count = null, comments_count = null, ad_spend = null, is_cumulative = null, body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "engagements",
            session: this.session,
            urlIds: { "id": this.id },
            params: { "occurred_on": occurred_on, "impressions_count": impressions_count, "views_count": views_count, "clicks_count": clicks_count, "shares_count": shares_count, "favorites_count": favorites_count, "comments_count": comments_count, "ad_spend": ad_spend, "is_cumulative": is_cumulative, ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    event_type;
    marketing_channel;
    paid;
    started_at;
    UTM_parameters;
    budget;
    budget_type;
    currency;
    description;
    ended_at;
    id;
    manage_url;
    marketed_resources;
    preview_url;
    referring_domain;
    remote_id;
    scheduled_to_end_at;
}

exports.MarketingEvent = MarketingEvent;
//# sourceMappingURL=marketing_event.js.map
