"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClusterToken = exports.InjectCluster = exports.namespaces = void 0;
const common_1 = require("@nestjs/common");
const cluster_constants_1 = require("../cluster.constants");
const utils_1 = require("../../utils");
exports.namespaces = new Map();
/**
 * This decorator is used to mark a specific constructor parameter as a cluster client.
 *
 * @param namespace - Client name
 *
 * @public
 */
const InjectCluster = (namespace = cluster_constants_1.DEFAULT_CLUSTER_NAMESPACE) => {
    const token = (0, exports.getClusterToken)(namespace);
    exports.namespaces.set(namespace, token);
    return (0, common_1.Inject)(token);
};
exports.InjectCluster = InjectCluster;
/**
 * This function generates an injection token for a cluster client.
 *
 * @param namespace - Client name
 *
 * @public
 */
const getClusterToken = (namespace) => {
    if ((0, utils_1.isSymbol)(namespace))
        return namespace;
    return `${cluster_constants_1.CLUSTER_MODULE_ID}:${namespace}`;
};
exports.getClusterToken = getClusterToken;
