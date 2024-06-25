"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergedOptionsProvider = exports.redisClientsProvider = exports.createRedisClientProviders = exports.createAsyncOptionsProvider = exports.createAsyncOptions = exports.createAsyncProviders = exports.createOptionsProvider = void 0;
const redis_constants_1 = require("./redis.constants");
const common_1 = require("./common");
const redis_manager_1 = require("./redis-manager");
const default_options_1 = require("./default-options");
const createOptionsProvider = (options) => ({
    provide: redis_constants_1.REDIS_OPTIONS,
    useValue: options
});
exports.createOptionsProvider = createOptionsProvider;
const createAsyncProviders = (options) => {
    if (options.useClass) {
        return [
            {
                provide: options.useClass,
                useClass: options.useClass
            },
            (0, exports.createAsyncOptionsProvider)(options)
        ];
    }
    if (options.useExisting || options.useFactory)
        return [(0, exports.createAsyncOptionsProvider)(options)];
    return [];
};
exports.createAsyncProviders = createAsyncProviders;
const createAsyncOptions = async (optionsFactory) => {
    return await optionsFactory.createRedisOptions();
};
exports.createAsyncOptions = createAsyncOptions;
const createAsyncOptionsProvider = (options) => {
    if (options.useFactory) {
        return {
            provide: redis_constants_1.REDIS_OPTIONS,
            useFactory: options.useFactory,
            inject: options.inject
        };
    }
    if (options.useClass) {
        return {
            provide: redis_constants_1.REDIS_OPTIONS,
            useFactory: exports.createAsyncOptions,
            inject: [options.useClass]
        };
    }
    if (options.useExisting) {
        return {
            provide: redis_constants_1.REDIS_OPTIONS,
            useFactory: exports.createAsyncOptions,
            inject: [options.useExisting]
        };
    }
    return {
        provide: redis_constants_1.REDIS_OPTIONS,
        useValue: {}
    };
};
exports.createAsyncOptionsProvider = createAsyncOptionsProvider;
const createRedisClientProviders = () => {
    const providers = [];
    common_1.namespaces.forEach((token, namespace) => {
        providers.push({
            provide: token,
            useFactory: (redisManager) => redisManager.getClient(namespace),
            inject: [redis_manager_1.RedisManager]
        });
    });
    return providers;
};
exports.createRedisClientProviders = createRedisClientProviders;
exports.redisClientsProvider = {
    provide: redis_constants_1.REDIS_CLIENTS,
    useFactory: (options) => {
        var _a;
        const clients = new Map();
        if (Array.isArray(options.config)) {
            options.config.forEach(item => {
                var _a;
                return clients.set((_a = item.namespace) !== null && _a !== void 0 ? _a : redis_constants_1.DEFAULT_REDIS_NAMESPACE, (0, common_1.createClient)(Object.assign(Object.assign({}, options.commonOptions), item), { readyLog: options.readyLog, errorLog: options.errorLog }));
            });
        }
        else if (options.config) {
            clients.set((_a = options.config.namespace) !== null && _a !== void 0 ? _a : redis_constants_1.DEFAULT_REDIS_NAMESPACE, (0, common_1.createClient)(options.config, { readyLog: options.readyLog, errorLog: options.errorLog }));
        }
        return clients;
    },
    inject: [redis_constants_1.REDIS_MERGED_OPTIONS]
};
exports.mergedOptionsProvider = {
    provide: redis_constants_1.REDIS_MERGED_OPTIONS,
    useFactory: (options) => (Object.assign(Object.assign({}, default_options_1.defaultRedisModuleOptions), options)),
    inject: [redis_constants_1.REDIS_OPTIONS]
};
