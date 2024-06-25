import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';
import { Metafield } from './metafield.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Article extends Base {
    static apiVersion = ApiVersion.January23;
    static hasOne = {};
    static hasMany = {
        "metafields": Metafield
    };
    static paths = [
        { "http_method": "delete", "operation": "delete", "ids": ["blog_id", "id"], "path": "blogs/<blog_id>/articles/<id>.json" },
        { "http_method": "get", "operation": "authors", "ids": [], "path": "articles/authors.json" },
        { "http_method": "get", "operation": "count", "ids": ["blog_id"], "path": "blogs/<blog_id>/articles/count.json" },
        { "http_method": "get", "operation": "get", "ids": ["blog_id"], "path": "blogs/<blog_id>/articles.json" },
        { "http_method": "get", "operation": "get", "ids": ["blog_id", "id"], "path": "blogs/<blog_id>/articles/<id>.json" },
        { "http_method": "get", "operation": "tags", "ids": [], "path": "articles/tags.json" },
        { "http_method": "get", "operation": "tags", "ids": ["blog_id"], "path": "blogs/<blog_id>/articles/tags.json" },
        { "http_method": "post", "operation": "post", "ids": ["blog_id"], "path": "blogs/<blog_id>/articles.json" },
        { "http_method": "put", "operation": "put", "ids": ["blog_id", "id"], "path": "blogs/<blog_id>/articles/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "article",
            "plural": "articles"
        }
    ];
    static async find({ session, id, blog_id = null, fields = null }) {
        const result = await this.baseFind({
            session: session,
            requireIds: true,
            urlIds: { "id": id, "blog_id": blog_id },
            params: { "fields": fields },
        });
        return result.data ? result.data[0] : null;
    }
    static async delete({ session, id, blog_id = null }) {
        const response = await this.request({
            http_method: "delete",
            operation: "delete",
            session: session,
            urlIds: { "id": id, "blog_id": blog_id },
            params: {},
        });
        return response ? response.body : null;
    }
    static async all({ session, blog_id = null, limit = null, since_id = null, created_at_min = null, created_at_max = null, updated_at_min = null, updated_at_max = null, published_at_min = null, published_at_max = null, published_status = null, handle = null, tag = null, author = null, fields = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: { "blog_id": blog_id },
            params: { "limit": limit, "since_id": since_id, "created_at_min": created_at_min, "created_at_max": created_at_max, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, "published_at_min": published_at_min, "published_at_max": published_at_max, "published_status": published_status, "handle": handle, "tag": tag, "author": author, "fields": fields, ...otherArgs },
        });
        return response;
    }
    static async authors({ session, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "authors",
            session: session,
            urlIds: {},
            params: { ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    static async count({ session, blog_id = null, created_at_min = null, created_at_max = null, updated_at_min = null, updated_at_max = null, published_at_min = null, published_at_max = null, published_status = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: { "blog_id": blog_id },
            params: { "created_at_min": created_at_min, "created_at_max": created_at_max, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, "published_at_min": published_at_min, "published_at_max": published_at_max, "published_status": published_status, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    static async tags({ session, blog_id = null, limit = null, popular = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "tags",
            session: session,
            urlIds: { "blog_id": blog_id },
            params: { "limit": limit, "popular": popular, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    author;
    blog_id;
    body_html;
    created_at;
    handle;
    id;
    image;
    metafields;
    published;
    published_at;
    summary_html;
    tags;
    template_suffix;
    title;
    updated_at;
    user_id;
}

export { Article };
//# sourceMappingURL=article.mjs.map
