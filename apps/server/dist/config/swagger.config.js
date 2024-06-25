"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = void 0;
const scheme_validator_helper_1 = require("./utils/scheme-validator.helper");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const zod_1 = require("zod");
const scheme = zod_1.z.object({
    password: zod_1.z.string(),
});
exports.swaggerConfig = (0, config_1.registerAs)('swagger', () => {
    const config = {
        password: process.env.SWAGGER_PASSWORD,
    };
    try {
        (0, scheme_validator_helper_1.validateScheme)(scheme, config, new common_1.Logger('SwaggerConfig'));
    }
    catch (error) {
        throw new common_1.InternalServerErrorException(`Environments failed: ${error.message}`);
    }
    return config;
});
//# sourceMappingURL=swagger.config.js.map