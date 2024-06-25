import Redis from 'ioredis';
import { RedisClientOptions, RedisClients, RedisModuleOptions } from '../interfaces';
import { ClientNamespace } from '../../interfaces';
export declare const addListeners: ({ namespace, instance, readyLog, errorLog }: {
    namespace: ClientNamespace;
    instance: Redis;
    readyLog?: boolean | undefined;
    errorLog?: boolean | undefined;
}) => void;
export declare const createClient: ({ namespace, url, path, onClientCreated, ...redisOptions }: RedisClientOptions, { readyLog, errorLog }: RedisModuleOptions) => Redis;
export declare const destroy: (clients: RedisClients) => Promise<[PromiseSettledResult<ClientNamespace>, PromiseSettledResult<"OK">][]>;
