import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class CustomerAddress extends Base {
    static apiVersion = ApiVersion.January23;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["customer_id", "id"], "path": "customers/<customer_id>/addresses/<id>.json" },
        { "http_method": "get", "operation": "get", "ids": ["customer_id"], "path": "customers/<customer_id>/addresses.json" },
        { "http_method": "get", "operation": "get", "ids": ["customer_id", "id"], "path": "customers/<customer_id>/addresses/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": ["customer_id"], "path": "customers/<customer_id>/addresses.json" },
        { "http_method": "put", "operation": "default", "ids": ["customer_id", "id"], "path": "customers/<customer_id>/addresses/<id>/default.json" },
        { "http_method": "put", "operation": "put", "ids": ["customer_id", "id"], "path": "customers/<customer_id>/addresses/<id>.json" },
        { "http_method": "put", "operation": "set", "ids": ["customer_id"], "path": "customers/<customer_id>/addresses/set.json" }
    ];
    static resourceNames = [
        {
            "singular": "customer_address",
            "plural": "customer_addresses"
        },
        {
            "singular": "address",
            "plural": "addresses"
        }
    ];
    static getJsonBodyName() {
        return "address";
    }
    setData(data) {
        if (this.resource().config.future?.customerAddressDefaultFix) {
            if ('default' in data) {
                data['is_default'] = Boolean(data['default']);
                delete data['default'];
            }
            else {
                data['is_default'] = false;
            }
        }
        return super.setData(data);
    }
    static async find({ session, id, customer_id = null }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "id": id, "customer_id": customer_id },
            params: {},
        });
        return result.data ? result.data[0] : null;
    }
    static async delete({ session, id, customer_id = null }) {
        const response = await this.request({
            http_method: "delete",
            operation: "delete",
            session: session,
            urlIds: { "id": id, "customer_id": customer_id },
            params: {},
        });
        return response ? response.body : null;
    }
    static async all({ session, customer_id = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: { "customer_id": customer_id },
            params: { ...otherArgs },
        });
        return response;
    }
    async default({ body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "put",
            operation: "default",
            session: this.session,
            urlIds: { "id": this.id, "customer_id": this.customer_id },
            params: { ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    async set({ address_ids = null, operation = null, body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "put",
            operation: "set",
            session: this.session,
            urlIds: { "customer_id": this.customer_id },
            params: { "address_ids": address_ids, "operation": operation, ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    address1;
    address2;
    city;
    company;
    country;
    country_code;
    country_name;
    customer_id;
    first_name;
    id;
    is_default;
    last_name;
    name;
    phone;
    province;
    province_code;
    zip;
}

export { CustomerAddress };
//# sourceMappingURL=customer_address.mjs.map
