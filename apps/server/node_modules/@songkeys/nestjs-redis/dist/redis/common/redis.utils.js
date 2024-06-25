"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.createClient = exports.addListeners = void 0;
const tslib_1 = require("tslib");
const ioredis_1 = tslib_1.__importDefault(require("ioredis"));
const messages_1 = require("../../messages");
const redis_logger_1 = require("../redis-logger");
const utils_1 = require("../../utils");
const constants_1 = require("../../constants");
const redis_constants_1 = require("../redis.constants");
const addListeners = ({ namespace, instance, readyLog, errorLog }) => {
    Reflect.set(instance, redis_constants_1.NAMESPACE_KEY, namespace);
    if (readyLog) {
        instance.on(constants_1.READY_EVENT, function () {
            redis_logger_1.logger.log((0, messages_1.READY_LOG)((0, utils_1.parseNamespace)(Reflect.get(this, redis_constants_1.NAMESPACE_KEY))));
        });
    }
    if (errorLog) {
        instance.on(constants_1.ERROR_EVENT, function (error) {
            redis_logger_1.logger.error((0, messages_1.ERROR_LOG)((0, utils_1.parseNamespace)(Reflect.get(this, redis_constants_1.NAMESPACE_KEY)), error.message), error.stack);
        });
    }
};
exports.addListeners = addListeners;
const createClient = (_a, _b) => {
    var { namespace, url, path, onClientCreated } = _a, redisOptions = tslib_1.__rest(_a, ["namespace", "url", "path", "onClientCreated"]);
    var readyLog = _b.readyLog, errorLog = _b.errorLog;
    let client;
    if (url)
        client = new ioredis_1.default(url, redisOptions);
    else if (path)
        client = new ioredis_1.default(path, redisOptions);
    else
        client = new ioredis_1.default(redisOptions);
    (0, exports.addListeners)({ namespace: namespace !== null && namespace !== void 0 ? namespace : redis_constants_1.DEFAULT_REDIS_NAMESPACE, instance: client, readyLog, errorLog });
    if (onClientCreated)
        onClientCreated(client);
    return client;
};
exports.createClient = createClient;
const destroy = async (clients) => {
    const promises = [];
    clients.forEach((client, namespace) => {
        if (client.status === constants_1.END_EVENT)
            return;
        if (client.status === constants_1.READY_EVENT) {
            promises.push(Promise.allSettled([namespace, client.quit()]));
            return;
        }
        client.disconnect();
    });
    return await Promise.all(promises);
};
exports.destroy = destroy;
