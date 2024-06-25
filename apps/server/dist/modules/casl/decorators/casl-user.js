"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaslUser = void 0;
const common_1 = require("@nestjs/common");
const context_proxy_1 = require("../proxies/context.proxy");
const casl_config_1 = require("../casl.config");
const user_proxy_1 = require("../proxies/user.proxy");
exports.CaslUser = (0, common_1.createParamDecorator)(async (data, context) => {
    return new user_proxy_1.UserProxy(await context_proxy_1.ContextProxy.create(context).getRequest(), casl_config_1.CaslConfig.getRootOptions().getUserFromRequest);
});
//# sourceMappingURL=casl-user.js.map