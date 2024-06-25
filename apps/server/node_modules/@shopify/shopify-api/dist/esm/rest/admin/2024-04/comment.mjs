import { Base } from '../../base.mjs';
import { ApiVersion } from '../../../lib/types.mjs';

/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
class Comment extends Base {
    static apiVersion = ApiVersion.April24;
    static hasOne = {};
    static hasMany = {};
    static paths = [
        { "http_method": "get", "operation": "count", "ids": [], "path": "comments/count.json" },
        { "http_method": "get", "operation": "get", "ids": [], "path": "comments.json" },
        { "http_method": "get", "operation": "get", "ids": ["id"], "path": "comments/<id>.json" },
        { "http_method": "post", "operation": "approve", "ids": ["id"], "path": "comments/<id>/approve.json" },
        { "http_method": "post", "operation": "not_spam", "ids": ["id"], "path": "comments/<id>/not_spam.json" },
        { "http_method": "post", "operation": "post", "ids": [], "path": "comments.json" },
        { "http_method": "post", "operation": "remove", "ids": ["id"], "path": "comments/<id>/remove.json" },
        { "http_method": "post", "operation": "restore", "ids": ["id"], "path": "comments/<id>/restore.json" },
        { "http_method": "post", "operation": "spam", "ids": ["id"], "path": "comments/<id>/spam.json" },
        { "http_method": "put", "operation": "put", "ids": ["id"], "path": "comments/<id>.json" }
    ];
    static resourceNames = [
        {
            "singular": "comment",
            "plural": "comments"
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
    static async all({ session, limit = null, since_id = null, created_at_min = null, created_at_max = null, updated_at_min = null, updated_at_max = null, published_at_min = null, published_at_max = null, fields = null, published_status = null, status = null, ...otherArgs }) {
        const response = await this.baseFind({
            session: session,
            urlIds: {},
            params: { "limit": limit, "since_id": since_id, "created_at_min": created_at_min, "created_at_max": created_at_max, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, "published_at_min": published_at_min, "published_at_max": published_at_max, "fields": fields, "published_status": published_status, "status": status, ...otherArgs },
        });
        return response;
    }
    static async count({ session, created_at_min = null, created_at_max = null, updated_at_min = null, updated_at_max = null, published_at_min = null, published_at_max = null, published_status = null, status = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "get",
            operation: "count",
            session: session,
            urlIds: {},
            params: { "created_at_min": created_at_min, "created_at_max": created_at_max, "updated_at_min": updated_at_min, "updated_at_max": updated_at_max, "published_at_min": published_at_min, "published_at_max": published_at_max, "published_status": published_status, "status": status, ...otherArgs },
            body: {},
            entity: null,
        });
        return response ? response.body : null;
    }
    async approve({ body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "approve",
            session: this.session,
            urlIds: { "id": this.id },
            params: { ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    async not_spam({ body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "not_spam",
            session: this.session,
            urlIds: { "id": this.id },
            params: { ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    async remove({ body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "remove",
            session: this.session,
            urlIds: { "id": this.id },
            params: { ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    async restore({ body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "restore",
            session: this.session,
            urlIds: { "id": this.id },
            params: { ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    async spam({ body = null, ...otherArgs }) {
        const response = await this.request({
            http_method: "post",
            operation: "spam",
            session: this.session,
            urlIds: { "id": this.id },
            params: { ...otherArgs },
            body: body,
            entity: this,
        });
        return response ? response.body : null;
    }
    article_id;
    author;
    blog_id;
    body;
    body_html;
    created_at;
    email;
    id;
    ip;
    published_at;
    status;
    updated_at;
    user_agent;
}

export { Comment };
//# sourceMappingURL=comment.mjs.map
