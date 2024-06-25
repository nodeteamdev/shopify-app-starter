"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaslConditions = void 0;
const common_1 = require("@nestjs/common");
const context_proxy_1 = require("../proxies/context.proxy");
exports.CaslConditions = (0, common_1.createParamDecorator)(async (data, context) => {
    const request = await context_proxy_1.ContextProxy.create(context).getRequest();
    return request.casl.conditions;
});
//# sourceMappingURL=casl-conditions.js.map