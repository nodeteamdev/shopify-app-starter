"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestProxy = void 0;
const subject_hook_factory_1 = require("../factories/subject-hook.factory");
const user_hook_factory_1 = require("../factories/user-hook.factory");
class RequestProxy {
    constructor(request) {
        this.request = request;
        this.defaultCaslCache = {
            hooks: {
                subject: new subject_hook_factory_1.NullSubjectHook(),
                user: new user_hook_factory_1.NullUserHook(),
            },
        };
        this.request.casl =
            this.request.casl ||
                this.defaultCaslCache;
    }
    get cached() {
        return this.request.casl;
    }
    getConditions() {
        return this.cached.conditions;
    }
    setConditions(conditions) {
        this.cached.conditions = conditions;
    }
    getSubject() {
        return this.cached.subject;
    }
    setSubject(subject) {
        this.cached.subject = subject;
    }
    getUser() {
        return this.cached.user;
    }
    setUser(user) {
        this.cached.user = user;
    }
    getUserHook() {
        return this.cached.hooks.user;
    }
    setUserHook(hook) {
        this.cached.hooks.user = hook;
    }
    getSubjectHook() {
        return this.cached.hooks.subject;
    }
    setSubjectHook(hook) {
        this.cached.hooks.subject = hook;
    }
}
exports.RequestProxy = RequestProxy;
//# sourceMappingURL=request.proxy.js.map