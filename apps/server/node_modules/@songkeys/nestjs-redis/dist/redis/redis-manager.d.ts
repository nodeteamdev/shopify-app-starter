import { Redis } from 'ioredis';
import { RedisClients } from './interfaces';
import { ClientNamespace } from '../interfaces';
/**
 * Manager for redis clients.
 *
 * @public
 */
export declare class RedisManager {
    private readonly redisClients;
    constructor(redisClients: RedisClients);
    /**
     * Retrieves all redis clients.
     */
    get clients(): ReadonlyMap<ClientNamespace, Redis>;
    /**
     * Retrieves a redis client by namespace.
     */
    getClient(namespace?: ClientNamespace): Redis;
}
