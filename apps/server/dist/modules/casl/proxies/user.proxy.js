"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProxy = void 0;
const request_proxy_1 = require("./request.proxy");
class UserProxy {
    constructor(request, getUserFromRequest) {
        this.request = request;
        this.getUserFromRequest = getUserFromRequest;
    }
    async get() {
        return (await this.getFromHook()) || this.getFromRequest() || undefined;
    }
    async getMeta() {
        const user = (await this.getFromHook()) || this.getFromRequest() || undefined;
        if (user) {
            return user._meta;
        }
        return user;
    }
    getFromRequest() {
        return this.getUserFromRequest(this.request);
    }
    async getFromHook() {
        const req = this.getRequest();
        const requestUser = this.getFromRequest();
        if (req.getUser()) {
            return req.getUser();
        }
        if (!requestUser) {
            return undefined;
        }
        req.setUser(await req.getUserHook().run(requestUser));
        return req.getUser();
    }
    getRequest() {
        return new request_proxy_1.RequestProxy(this.request);
    }
}
exports.UserProxy = UserProxy;
//# sourceMappingURL=user.proxy.js.map