import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';
import { Image } from './image.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Collection extends Base {
    static apiVersion = ApiVersion.October23;
    static hasOne = {
        "image": Image
    };
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "collections/<id>.json" },
        { "http_method": "get", "operation": "products", "ids": ["id"], "path": "collections/<id>/products.json" }
    ];
    static resourceNames = [
        {
            "singular": "collection",
            "plural": "collections"
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
    static async products({ session, id, limit = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "products",
            session: session,
            urlIds: { "id": id },
            params: { "limit": limit, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    title;
    body_html;
    handle;
    id;
    image;
    published_at;
    published_scope;
    sort_order;
    template_suffix;
    updated_at;
}

export { Collection };
//# sourceMappingURL=collection.mjs.map
