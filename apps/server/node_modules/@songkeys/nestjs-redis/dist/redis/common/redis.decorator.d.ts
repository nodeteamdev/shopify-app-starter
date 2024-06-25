import { ClientNamespace } from '../../interfaces';
export declare const namespaces: Map<ClientNamespace, ClientNamespace>;
/**
 * This decorator is used to mark a specific constructor parameter as a redis client.
 *
 * @param namespace - Client name
 *
 * @public
 */
export declare const InjectRedis: (namespace?: ClientNamespace) => ParameterDecorator;
/**
 * This function generates an injection token for a redis client.
 *
 * @param namespace - Client name
 *
 * @public
 */
export declare const getRedisToken: (namespace: ClientNamespace) => ClientNamespace;
