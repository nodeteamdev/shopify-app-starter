"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConfig = void 0;
const scheme_validator_helper_1 = require("./utils/scheme-validator.helper");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const zod_1 = require("zod");
const scheme = zod_1.z.object({
    url: zod_1.z.string().url(),
});
exports.redisConfig = (0, config_1.registerAs)('redis', () => {
    const config = {
        url: process.env.REDIS_URL,
    };
    try {
        (0, scheme_validator_helper_1.validateScheme)(scheme, config, new common_1.Logger('RedisConfig'));
    }
    catch (error) {
        throw new common_1.InternalServerErrorException(`Environments failed: ${error.message}`);
    }
    return config;
});
//# sourceMappingURL=redis.config.js.map