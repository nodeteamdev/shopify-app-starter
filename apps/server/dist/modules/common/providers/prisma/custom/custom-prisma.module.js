"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CustomPrismaModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomPrismaModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("..");
const custom_prisma_constants_1 = require("./custom-prisma.constants");
let CustomPrismaModule = CustomPrismaModule_1 = class CustomPrismaModule {
    static forRoot(options) {
        return {
            global: options.isGlobal,
            module: CustomPrismaModule_1,
            providers: [
                { provide: custom_prisma_constants_1.CUSTOM_PRISMA_CLIENT, useValue: options.client },
                {
                    provide: options.name,
                    useClass: prisma_1.CustomPrismaService,
                },
            ],
            exports: [options.name],
        };
    }
    static forRootAsync(options) {
        return {
            global: options.isGlobal,
            module: CustomPrismaModule_1,
            imports: options.imports || [],
            providers: [
                ...this.createAsyncProvider(options),
                {
                    provide: options.name,
                    useClass: prisma_1.CustomPrismaService,
                },
            ],
            exports: [options.name],
        };
    }
    static createAsyncProvider(options) {
        if (options.useFactory) {
            return [
                {
                    provide: custom_prisma_constants_1.CUSTOM_PRISMA_CLIENT,
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
            ];
        }
        if (options.useClass) {
            return [
                { provide: options.useClass, useClass: options.useClass },
                {
                    provide: custom_prisma_constants_1.CUSTOM_PRISMA_CLIENT,
                    useFactory: async (optionsFactory) => await optionsFactory.createPrismaClient(),
                    inject: [options.useClass],
                },
            ];
        }
        this.logger.error('You must at least provide `useFactory` or `useClass`.');
        return [];
    }
};
exports.CustomPrismaModule = CustomPrismaModule;
CustomPrismaModule.logger = new common_1.Logger('CustomPrismaModule');
exports.CustomPrismaModule = CustomPrismaModule = CustomPrismaModule_1 = __decorate([
    (0, common_1.Module)({})
], CustomPrismaModule);
//# sourceMappingURL=custom-prisma.module.js.map