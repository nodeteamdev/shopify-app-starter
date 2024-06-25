"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHookFactory = exports.TupleUserHook = exports.NullUserHook = void 0;
class NullUserHook {
    async run() {
        return undefined;
    }
}
exports.NullUserHook = NullUserHook;
class TupleUserHook {
    constructor(service, runFunc) {
        this.service = service;
        this.runFunc = runFunc;
    }
    async run(user) {
        return this.runFunc(this.service, user);
    }
}
exports.TupleUserHook = TupleUserHook;
async function userHookFactory(moduleRef, hookOrTuple) {
    if (!hookOrTuple) {
        return new NullUserHook();
    }
    if (Array.isArray(hookOrTuple)) {
        const [ServiceClass, runFunction] = hookOrTuple;
        const service = moduleRef.get(ServiceClass, { strict: false });
        return new TupleUserHook(service, runFunction);
    }
    return moduleRef.create(hookOrTuple);
}
exports.userHookFactory = userHookFactory;
//# sourceMappingURL=user-hook.factory.js.map