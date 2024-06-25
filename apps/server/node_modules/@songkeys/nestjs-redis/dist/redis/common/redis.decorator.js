"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisToken = exports.InjectRedis = exports.namespaces = void 0;
const common_1 = require("@nestjs/common");
const redis_constants_1 = require("../redis.constants");
const utils_1 = require("../../utils");
exports.namespaces = new Map();
/**
 * This decorator is used to mark a specific constructor parameter as a redis client.
 *
 * @param namespace - Client name
 *
 * @public
 */
const InjectRedis = (namespace = redis_constants_1.DEFAULT_REDIS_NAMESPACE) => {
    const token = (0, exports.getRedisToken)(namespace);
    exports.namespaces.set(namespace, token);
    return (0, common_1.Inject)(token);
};
exports.InjectRedis = InjectRedis;
/**
 * This function generates an injection token for a redis client.
 *
 * @param namespace - Client name
 *
 * @public
 */
const getRedisToken = (namespace) => {
    if ((0, utils_1.isSymbol)(namespace))
        return namespace;
    return `${redis_constants_1.REDIS_MODULE_ID}:${namespace}`;
};
exports.getRedisToken = getRedisToken;
