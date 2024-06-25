"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectHookFactory = exports.TupleSubjectHook = exports.NullSubjectHook = void 0;
class NullSubjectHook {
    async run() {
        return undefined;
    }
}
exports.NullSubjectHook = NullSubjectHook;
class TupleSubjectHook {
    constructor(service, runFunc) {
        this.service = service;
        this.runFunc = runFunc;
    }
    async run(request) {
        return this.runFunc(this.service, request);
    }
}
exports.TupleSubjectHook = TupleSubjectHook;
async function subjectHookFactory(moduleRef, hookOrTuple) {
    if (!hookOrTuple) {
        return new NullSubjectHook();
    }
    if (Array.isArray(hookOrTuple)) {
        const [ServiceClass, runFunction] = hookOrTuple;
        const service = moduleRef.get(ServiceClass, { strict: false });
        return new TupleSubjectHook(service, runFunction);
    }
    return moduleRef.create(hookOrTuple);
}
exports.subjectHookFactory = subjectHookFactory;
//# sourceMappingURL=subject-hook.factory.js.map