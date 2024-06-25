"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailerConfig = void 0;
const scheme_validator_helper_1 = require("./utils/scheme-validator.helper");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const zod_1 = require("zod");
const scheme = zod_1.z.object({
    host: zod_1.z.string(),
    port: zod_1.z.number(),
    secure: zod_1.z.boolean(),
    user: zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string(),
    }),
    emailFrom: zod_1.z.string(),
    adminEmail: zod_1.z.string(),
});
exports.mailerConfig = (0, config_1.registerAs)('mailer', () => {
    const secure = process.env.MAILER_SECURE;
    let isSecure = undefined;
    if (secure === 'false')
        isSecure = false;
    if (secure === 'true')
        isSecure = true;
    const config = {
        host: process.env.MAILER_HOST,
        port: Number(process.env.MAILER_PORT),
        secure: isSecure,
        user: {
            email: process.env.MAILER_USER_EMAIL,
            password: process.env.MAILER_USER_PASSWORD,
        },
        adminEmail: process.env.ADMIN_EMAIL,
        emailFrom: process.env.EMAIL_FROM,
    };
    (0, scheme_validator_helper_1.validateScheme)(scheme, config, new common_1.Logger('MailerConfig'));
    return config;
});
//# sourceMappingURL=mailer.config.js.map