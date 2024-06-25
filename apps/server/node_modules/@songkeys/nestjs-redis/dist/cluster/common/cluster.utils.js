"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.createClient = exports.addListeners = void 0;
const tslib_1 = require("tslib");
const ioredis_1 = require("ioredis");
const messages_1 = require("../../messages");
const cluster_logger_1 = require("../cluster-logger");
const utils_1 = require("../../utils");
const constants_1 = require("../../constants");
const cluster_constants_1 = require("../cluster.constants");
const addListeners = ({ namespace, instance, readyLog, errorLog }) => {
    Reflect.set(instance, cluster_constants_1.NAMESPACE_KEY, namespace);
    if (readyLog) {
        instance.on(constants_1.READY_EVENT, function () {
            cluster_logger_1.logger.log((0, messages_1.READY_LOG)((0, utils_1.parseNamespace)(Reflect.get(this, cluster_constants_1.NAMESPACE_KEY))));
        });
    }
    if (errorLog) {
        instance.on(constants_1.ERROR_EVENT, function (error) {
            cluster_logger_1.logger.error((0, messages_1.ERROR_LOG)((0, utils_1.parseNamespace)(Reflect.get(this, cluster_constants_1.NAMESPACE_KEY)), error.message), error.stack);
        });
    }
};
exports.addListeners = addListeners;
const createClient = (_a, _b) => {
    var { namespace, nodes, onClientCreated } = _a, clusterOptions = tslib_1.__rest(_a, ["namespace", "nodes", "onClientCreated"]);
    var readyLog = _b.readyLog, errorLog = _b.errorLog;
    const client = new ioredis_1.Cluster(nodes, clusterOptions);
    (0, exports.addListeners)({ namespace: namespace !== null && namespace !== void 0 ? namespace : cluster_constants_1.DEFAULT_CLUSTER_NAMESPACE, instance: client, readyLog, errorLog });
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
