"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaslSubject = void 0;
const common_1 = require("@nestjs/common");
const subject_proxy_1 = require("../proxies/subject.proxy");
const context_proxy_1 = require("../proxies/context.proxy");
exports.CaslSubject = (0, common_1.createParamDecorator)(async (data, context) => {
    return new subject_proxy_1.SubjectProxy(await context_proxy_1.ContextProxy.create(context).getRequest());
});
//# sourceMappingURL=casl-subject.js.map