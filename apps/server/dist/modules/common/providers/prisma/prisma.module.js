"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PrismaModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_constants_1 = require("./prisma.constants");
const prisma_service_1 = require("./prisma.service");
let PrismaModule = PrismaModule_1 = class PrismaModule {
    static forRoot(options = {}) {
        return {
            global: options.isGlobal,
            module: PrismaModule_1,
            providers: [
                {
                    provide: prisma_constants_1.PRISMA_SERVICE_OPTIONS,
                    useValue: options.prismaServiceOptions,
                },
            ],
        };
    }
    static forRootAsync(options) {
        return {
            global: options.isGlobal,
            module: PrismaModule_1,
            imports: options.imports || [],
            providers: this.createAsyncProviders(options),
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return this.createAsyncOptionsProvider(options);
        }
        return [
            ...this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return [
                {
                    provide: prisma_constants_1.PRISMA_SERVICE_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
            ];
        }
        return [
            {
                provide: prisma_constants_1.PRISMA_SERVICE_OPTIONS,
                useFactory: async (optionsFactory) => await optionsFactory.createPrismaOptions(),
                inject: [options.useExisting || options.useClass],
            },
        ];
    }
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = PrismaModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);
//# sourceMappingURL=prisma.module.js.map