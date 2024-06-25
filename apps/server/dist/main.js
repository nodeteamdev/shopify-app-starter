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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const node_envs_enum_1 = require("./modules/common/enums/node-envs.enum");
const app_module_1 = require("./modules/app/app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const swagger_custom_options_1 = __importDefault(require("./options/swagger-custom.options"));
const Sentry = __importStar(require("@sentry/node"));
const class_validator_1 = require("class-validator");
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const helmet_1 = __importDefault(require("helmet"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, cookie_parser_1.default)());
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    const configService = app.get(config_1.ConfigService);
    const appConfig = configService.get('app');
    const swaggerConfig = configService.get('swagger');
    const sentryConfig = configService.get('sentry');
    if (appConfig.nodeEnv === node_envs_enum_1.NodeEnvsEnum.PRODUCTION) {
        const newrelic = require('newrelic');
        newrelic.instrumentLoadedModule('app', app);
    }
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
    }));
    {
        const options = appConfig.loggerLevel;
        app.useLogger(options);
    }
    {
        const options = {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
            optionsSuccessStatus: 204,
            credentials: true,
        };
        app.enableCors(options);
    }
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        skipMissingProperties: false,
    }));
    {
        const options = {
            exclude: [{ path: '/', method: common_1.RequestMethod.GET }],
        };
        app.setGlobalPrefix('api', options);
    }
    {
        const options = {
            type: common_1.VersioningType.URI,
            defaultVersion: '1',
        };
        app.enableVersioning(options);
    }
    {
        app.use(['/docs', '/documentation'], (0, express_basic_auth_1.default)({
            challenge: true,
            users: {
                admin: swaggerConfig.password,
            },
        }));
        const options = new swagger_1.DocumentBuilder()
            .setTitle('Api v1')
            .setDescription('Shopify App API v1')
            .setVersion('1.0')
            .addBearerAuth({ in: 'header', type: 'http' })
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup('docs', app, document, swagger_custom_options_1.default);
    }
    if (appConfig.nodeEnv === node_envs_enum_1.NodeEnvsEnum.PRODUCTION ||
        appConfig.nodeEnv === node_envs_enum_1.NodeEnvsEnum.STAGING) {
        Sentry.init({
            dsn: sentryConfig.dns,
            tracesSampleRate: 1.0,
            release: '0.0.1',
            environment: appConfig.nodeEnv,
        });
    }
    await app.listen(appConfig.port);
    return {
        appConfig,
        ngrokConfig: configService.get('ngrok'),
    };
}
bootstrap().then(async ({ appConfig, ngrokConfig }) => {
    common_1.Logger.log(`Running in http://localhost:${appConfig.port}`, 'Bootstrap');
    common_1.Logger.log(`Docs in http://localhost:${appConfig.port}/docs`, 'Swagger');
    if (appConfig.nodeEnv === node_envs_enum_1.NodeEnvsEnum.DEVELOPMENT && ngrokConfig.domain) {
        const ngrok = await import('@ngrok/ngrok');
        const listener = await ngrok.forward({
            port: appConfig.port,
            domain: ngrokConfig.domain,
            authtoken: ngrokConfig.authToken,
        });
        common_1.Logger.log(`Ngrok ingress established at: ${listener.url()}`, 'Ngrok');
        common_1.Logger.log(`Docs at: ${listener.url()}/docs`, 'Swagger');
    }
    else {
        common_1.Logger.log(`Running at https://${appConfig.host}`, 'Bootstrap');
        common_1.Logger.log(`Docs at https://${appConfig.host}/docs`, 'Swagger');
    }
});
//# sourceMappingURL=main.js.map