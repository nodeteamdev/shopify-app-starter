import { ClientNamespace } from '../../interfaces';
export declare const namespaces: Map<ClientNamespace, ClientNamespace>;
/**
 * This decorator is used to mark a specific constructor parameter as a cluster client.
 *
 * @param namespace - Client name
 *
 * @public
 */
export declare const InjectCluster: (namespace?: ClientNamespace) => ParameterDecorator;
/**
 * This function generates an injection token for a cluster client.
 *
 * @param namespace - Client name
 *
 * @public
 */
export declare const getClusterToken: (namespace: ClientNamespace) => ClientNamespace;
