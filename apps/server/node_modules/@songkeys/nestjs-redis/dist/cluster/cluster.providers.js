"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergedOptionsProvider = exports.clusterClientsProvider = exports.createClusterClientProviders = exports.createAsyncOptionsProvider = exports.createAsyncOptions = exports.createAsyncProviders = exports.createOptionsProvider = void 0;
const cluster_constants_1 = require("./cluster.constants");
const common_1 = require("./common");
const cluster_manager_1 = require("./cluster-manager");
const default_options_1 = require("./default-options");
const createOptionsProvider = (options) => ({
    provide: cluster_constants_1.CLUSTER_OPTIONS,
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
    return await optionsFactory.createClusterOptions();
};
exports.createAsyncOptions = createAsyncOptions;
const createAsyncOptionsProvider = (options) => {
    if (options.useFactory) {
        return {
            provide: cluster_constants_1.CLUSTER_OPTIONS,
            useFactory: options.useFactory,
            inject: options.inject
        };
    }
    if (options.useClass) {
        return {
            provide: cluster_constants_1.CLUSTER_OPTIONS,
            useFactory: exports.createAsyncOptions,
            inject: [options.useClass]
        };
    }
    if (options.useExisting) {
        return {
            provide: cluster_constants_1.CLUSTER_OPTIONS,
            useFactory: exports.createAsyncOptions,
            inject: [options.useExisting]
        };
    }
    return {
        provide: cluster_constants_1.CLUSTER_OPTIONS,
        useValue: {}
    };
};
exports.createAsyncOptionsProvider = createAsyncOptionsProvider;
const createClusterClientProviders = () => {
    const providers = [];
    common_1.namespaces.forEach((token, namespace) => {
        providers.push({
            provide: token,
            useFactory: (clusterManager) => clusterManager.getClient(namespace),
            inject: [cluster_manager_1.ClusterManager]
        });
    });
    return providers;
};
exports.createClusterClientProviders = createClusterClientProviders;
exports.clusterClientsProvider = {
    provide: cluster_constants_1.CLUSTER_CLIENTS,
    useFactory: (options) => {
        var _a;
        const clients = new Map();
        if (Array.isArray(options.config)) {
            options.config.forEach(item => {
                var _a;
                return clients.set((_a = item.namespace) !== null && _a !== void 0 ? _a : cluster_constants_1.DEFAULT_CLUSTER_NAMESPACE, (0, common_1.createClient)(item, { readyLog: options.readyLog, errorLog: options.errorLog }));
            });
        }
        else if (options.config) {
            clients.set((_a = options.config.namespace) !== null && _a !== void 0 ? _a : cluster_constants_1.DEFAULT_CLUSTER_NAMESPACE, (0, common_1.createClient)(options.config, { readyLog: options.readyLog, errorLog: options.errorLog }));
        }
        return clients;
    },
    inject: [cluster_constants_1.CLUSTER_MERGED_OPTIONS]
};
exports.mergedOptionsProvider = {
    provide: cluster_constants_1.CLUSTER_MERGED_OPTIONS,
    useFactory: (options) => (Object.assign(Object.assign({}, default_options_1.defaultClusterModuleOptions), options)),
    inject: [cluster_constants_1.CLUSTER_OPTIONS]
};
