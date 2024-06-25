"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
const scheme_validator_helper_1 = require("./utils/scheme-validator.helper");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const zod_1 = require("zod");
const baseScheme = zod_1.z.object({
    secret: zod_1.z.string(),
    expTime: zod_1.z.object({
        milliseconds: zod_1.z.number(),
        seconds: zod_1.z.number(),
    }),
});
const scheme = zod_1.z.object({
    access: baseScheme,
    refresh: baseScheme,
    resetPassword: baseScheme,
    verifyEmail: baseScheme,
});
exports.jwtConfig = (0, config_1.registerAs)('jwt', () => {
    const config = {
        access: {
            secret: process.env.ACCESS_JWT_SECRET,
            expTime: {
                milliseconds: Number(process.env.ACCESS_JWT_EXP_TIME),
                seconds: Math.ceil(Number(process.env.ACCESS_JWT_EXP_TIME) / 1000),
            },
        },
        refresh: {
            secret: process.env.REFRESH_JWT_SECRET,
            expTime: {
                milliseconds: Number(process.env.REFRESH_JWT_EXP_TIME),
                seconds: Math.ceil(Number(process.env.REFRESH_JWT_EXP_TIME) / 1000),
            },
        },
        resetPassword: {
            secret: process.env.RESET_PASSWORD_JWT_SECRET,
            expTime: {
                milliseconds: Number(process.env.RESET_PASSWORD_JWT_EXP_TIME),
                seconds: Math.ceil(Number(process.env.RESET_PASSWORD_JWT_EXP_TIME) / 1000),
            },
        },
        verifyEmail: {
            secret: process.env.VERIFY_EMAIL_JWT_SECRET,
            expTime: {
                milliseconds: Number(process.env.VERIFY_EMAIL_JWT_EXP_TIME),
                seconds: Math.ceil(Number(process.env.VERIFY_EMAIL_JWT_EXP_TIME) / 1000),
            },
        },
    };
    (0, scheme_validator_helper_1.validateScheme)(scheme, config, new common_1.Logger('JwtConfig'));
    return config;
});
//# sourceMappingURL=jwt.config.js.map