"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CaslModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaslModule = void 0;
const common_1 = require("@nestjs/common");
const casl_constants_1 = require("./casl.constants");
const access_service_1 = require("./access.service");
const ability_factory_1 = require("./factories/ability.factory");
const casl_config_1 = require("./casl.config");
let CaslModule = CaslModule_1 = class CaslModule {
    static forFeature(options) {
        return {
            module: CaslModule_1,
            imports: [],
            providers: [
                access_service_1.AccessService,
                ability_factory_1.AbilityFactory,
                {
                    provide: casl_constants_1.CASL_FEATURE_OPTIONS,
                    useValue: options,
                },
            ],
        };
    }
    static forRoot(options) {
        Reflect.defineMetadata(casl_constants_1.CASL_ROOT_OPTIONS, options, casl_config_1.CaslConfig);
        return {
            module: CaslModule_1,
        };
    }
    static forRootAsync(options) {
        return {
            module: CaslModule_1,
            imports: options.imports,
            providers: [
                {
                    provide: casl_constants_1.CASL_ROOT_OPTIONS,
                    useFactory: async (...args) => {
                        const caslRootOptions = await options.useFactory(...args);
                        Reflect.defineMetadata(casl_constants_1.CASL_ROOT_OPTIONS, caslRootOptions, casl_config_1.CaslConfig);
                        return caslRootOptions;
                    },
                    inject: options.inject,
                },
            ],
        };
    }
};
exports.CaslModule = CaslModule;
exports.CaslModule = CaslModule = CaslModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [
            access_service_1.AccessService,
            ability_factory_1.AbilityFactory,
            {
                provide: casl_constants_1.CASL_FEATURE_OPTIONS,
                useValue: {},
            },
        ],
        exports: [access_service_1.AccessService],
    })
], CaslModule);
//# sourceMappingURL=casl.module.js.map