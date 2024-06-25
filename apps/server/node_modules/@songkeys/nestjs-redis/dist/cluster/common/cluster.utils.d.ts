import { Cluster } from 'ioredis';
import { ClusterClientOptions, ClusterClients, ClusterModuleOptions } from '../interfaces';
import { ClientNamespace } from '../../interfaces';
export declare const addListeners: ({ namespace, instance, readyLog, errorLog }: {
    namespace: ClientNamespace;
    instance: Cluster;
    readyLog?: boolean | undefined;
    errorLog?: boolean | undefined;
}) => void;
export declare const createClient: ({ namespace, nodes, onClientCreated, ...clusterOptions }: ClusterClientOptions, { readyLog, errorLog }: Partial<ClusterModuleOptions>) => Cluster;
export declare const destroy: (clients: ClusterClients) => Promise<[PromiseSettledResult<ClientNamespace>, PromiseSettledResult<"OK">][]>;
