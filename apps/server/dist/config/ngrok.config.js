"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngrokConfig = void 0;
const scheme_validator_helper_1 = require("./utils/scheme-validator.helper");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const zod_1 = require("zod");
const scheme = zod_1.z.object({
    domain: zod_1.z.string(),
    authToken: zod_1.z.string(),
});
exports.ngrokConfig = (0, config_1.registerAs)('ngrok', () => {
    const config = {
        domain: process.env.NGROK_DOMAIN,
        authToken: process.env.NGROK_AUTHTOKEN,
    };
    (0, scheme_validator_helper_1.validateScheme)(scheme, config, new common_1.Logger('NgrokConfig'));
    return config;
});
//# sourceMappingURL=ngrok.config.js.map