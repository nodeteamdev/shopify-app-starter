"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const path = __importStar(require("node:path"));
const scheme_validator_helper_1 = require("./utils/scheme-validator.helper");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const utils_service_1 = require("../modules/common/services/utils.service");
const zod_1 = require("zod");
const scheme = zod_1.z.object({
    port: zod_1.z.number(),
    loggerLevel: zod_1.z.array(zod_1.z.union([
        zod_1.z.literal('log'),
        zod_1.z.literal('error'),
        zod_1.z.literal('warn'),
        zod_1.z.literal('debug'),
        zod_1.z.literal('verbose'),
        zod_1.z.literal('fatal'),
    ])),
    nodeEnv: zod_1.z.string(),
    clientHost: zod_1.z.string(),
    version: zod_1.z.string(),
    rateLimitTtl: zod_1.z.number(),
    rateLimitTimes: zod_1.z.number(),
    sentryDns: zod_1.z.string(),
    host: zod_1.z.string(),
});
exports.appConfig = (0, config_1.registerAs)('app', () => {
    const config = {
        port: Number(process.env.APP_PORT),
        loggerLevel: utils_service_1.Utils.parseLogLevel(process.env.APP_LOGGER_LEVEL),
        nodeEnv: process.env.NODE_ENV,
        clientHost: process.env.CLIENT_HOST_NAME,
        version: require(path.join(process.cwd(), 'package.json')).version,
        rateLimitTtl: Number(process.env.DEFAULT_RATE_LIMIT_TTL),
        rateLimitTimes: Number(process.env.DEFAULT_RATE_LIMIT_TIMES),
        sentryDns: process.env.SENTRY_DSN,
        host: process.env.API_HOST_NAME,
    };
    (0, scheme_validator_helper_1.validateScheme)(scheme, config, new common_1.Logger('AppConfig'));
    return config;
});
//# sourceMappingURL=app.config.js.map