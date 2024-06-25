import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';
import { Country } from './country.mjs';
import { Province } from './province.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class FulfillmentEvent extends Base {
    static apiVersion = ApiVersion.January24;
    static hasOne = {
        "country": Country,
        "province": Province
    };
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["order_id", "fulfillment_id", "id"], "path": "orders/<order_id>/fulfillments/<fulfillment_id>/events/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": ["order_id", "fulfillment_id"], "path": "orders/<order_id>/fulfillments/<fulfillment_id>/events.json" },
        { "http_method": "get", "operation": "get", "ids": ["order_id", "fulfillment_id", "id"], "path": "orders/<order_id>/fulfillments/<fulfillment_id>/events/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": ["order_id", "fulfillment_id"], "path": "orders/<order_id>/fulfillments/<fulfillment_id>/events.json" }
    ];
    static resourceNames = [
        {
            "singular": "fulfillment_event",
            "plural": "fulfillment_events"
        }
    ];
    static getJsonBodyName() {
        return "event";
    }
    static async find({ session, id, order_id = null, fulfillment_id = null, event_id = null }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "id": id, "order_id": order_id, "fulfillment_id": fulfillment_id },
            params: { "event_id": event_id },
        });
        return result.data ? result.data[0] : null;
    }
    static async delete({ session, id, order_id = null, fulfillment_id = null }) {
        const response = await this.request({
            http_method: "delete",
            operation: "delete",
            session: session,
            urlIds: { "id": id, "order_id": order_id, "fulfillment_id": fulfillment_id },
            params: {},
        });
        return response ? response.body : null;
    }
    static async all({ session, order_id = null, fulfillment_id = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: { "order_id": order_id, "fulfillment_id": fulfillment_id },
            params: { ...otherArgs },
        });
        return response;
    }
    address1;
    city;
    country;
    created_at;
    estimated_delivery_at;
    fulfillment_id;
    happened_at;
    id;
    latitude;
    longitude;
    message;
    order_id;
    province;
    shop_id;
    status;
    updated_at;
    zip;
}

export { FulfillmentEvent };
//# sourceMappingURL=fulfillment_event.mjs.map
