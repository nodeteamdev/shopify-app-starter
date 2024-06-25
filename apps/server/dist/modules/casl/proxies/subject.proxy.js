"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectProxy = void 0;
const request_proxy_1 = require("./request.proxy");
class SubjectProxy {
    constructor(request) {
        this.request = request;
    }
    async get() {
        const req = this.getRequest();
        if (req.getSubject()) {
            return req.getSubject();
        }
        req.setSubject(await req.getSubjectHook().run(this.request));
        return req.getSubject();
    }
    getRequest() {
        return new request_proxy_1.RequestProxy(this.request);
    }
}
exports.SubjectProxy = SubjectProxy;
//# sourceMappingURL=subject.proxy.js.map