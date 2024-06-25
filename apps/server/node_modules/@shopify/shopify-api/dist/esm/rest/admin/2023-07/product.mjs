import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';
import { Image } from './image.mjs';
import { Variant } from './variant.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Product extends Base {
    static apiVersion = ApiVersion.July23;
    static hasOne = {};
    static hasMany = {
        "images": Image,
        "variants": Variant
    };
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["id"], "path": "products/<id>.json" },
        { "http_method": "get", "operation": "count", "ids": [], "path": "products/count.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "products.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "products/<id>.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "products.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "products/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "product",
            "plural": "products"
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
    static async all({ session, ids = null, limit = null, since_id = null, title = null, vendor = null, handle = null, product_type = null, status = null, collection_id = null, created_at_min = null, created_at_max = null, updated_at_min = null, updated_at_max = null, published_at_min = null, published_at_max = null, published_status = null, fields = null, presentment_currencies = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "ids": ids, "limit": limit, "since_id": since_id, "title": title, "vendor": vendor, "handle": handle, "product_type": product_type, "status": status, "collection_id": collection_id, "created_at_min": created_at_min, "created_at_max": created_at_max, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, "published_at_min": published_at_min, "published_at_max": published_at_max, "published_status": published_status, "fields": fields, "presentment_currencies": presentment_currencies, ...otherArgs },
        });
        return response;
    }
    static async count({ session, vendor = null, product_type = null, collection_id = null, created_at_min = null, created_at_max = null, updated_at_min = null, updated_at_max = null, published_at_min = null, published_at_max = null, published_status = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: {},
            params: { "vendor": vendor, "product_type": product_type, "collection_id": collection_id, "created_at_min": created_at_min, "created_at_max": created_at_max, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, "published_at_min": published_at_min, "published_at_max": published_at_max, "published_status": published_status, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    title;
    body_html;
    created_at;
    handle;
    id;
    images;
    options;
    product_type;
    published_at;
    published_scope;
    status;
    tags;
    template_suffix;
    updated_at;
    variants;
    vendor;
}

export { Product };
//# sourceMappingURL=product.mjs.map
