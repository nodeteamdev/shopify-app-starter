import type { Cluster } from 'ioredis';
import { ClusterClients } from './interfaces';
import { ClientNamespace } from '../interfaces';
/**
 * Manager for cluster clients.
 *
 * @public
 */
export declare class ClusterManager {
    private readonly clusterClients;
    constructor(clusterClients: ClusterClients);
    /**
     * Retrieves all cluster clients.
     */
    get clients(): ReadonlyMap<ClientNamespace, Cluster>;
    /**
     * Retrieves a cluster client by namespace.
     */
    getClient(namespace?: ClientNamespace): Cluster;
}
