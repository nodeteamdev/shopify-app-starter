/// <reference types="node" />
import { Redis } from 'ioredis';
import { RedisKey } from 'ioredis/built/utils/RedisCommander';
export declare class RedisService {
    private readonly redisClient;
    private readonly logger;
    constructor(redisClient: Redis);
    isExist(key: RedisKey): Promise<number>;
    getTtl(key: RedisKey): Promise<number>;
    setExpire(key: RedisKey, seconds: number | string): Promise<number>;
    setOne(key: RedisKey, value: string | Buffer | number): Promise<'OK'>;
    appendOne(key: RedisKey, value: string | Buffer | number): Promise<number>;
    getOne(key: RedisKey): Promise<string | null>;
    setOneWithExpire(key: RedisKey, value: string | Buffer | number, seconds: number | string): Promise<'OK'>;
    setExpireForMany(keys: RedisKey[], seconds: number | string): Promise<number[]>;
    setMany(keyValues: [RedisKey, string | Buffer | number][]): Promise<'OK'>;
    setManyWithExpire(keyValues: [RedisKey, string | Buffer | number][], seconds: number | string): Promise<'OK'>;
    getMany(keys: RedisKey[]): Promise<(string | null)[]>;
    delete(key: RedisKey): Promise<number>;
    deleteMany(keys: RedisKey[]): Promise<number>;
    getKeys(pattern: string | `${string}*`): Promise<string[]>;
    setManyToHashMap(key: RedisKey, hashValues: object | Map<string | Buffer | number, string | Buffer | number>): Promise<'OK'>;
    getManyFromHashMap(key: RedisKey, fields?: string[]): Promise<(string | null)[]>;
    getHashMapKeys(key: RedisKey): Promise<string[]>;
    deleteHashMapKeys(key: RedisKey, keys: RedisKey[]): Promise<number>;
    deleteHashMap(key: RedisKey): Promise<number>;
    rpush(key: RedisKey, ...elements: number[]): Promise<number>;
    ttl(key: RedisKey): Promise<number>;
    pexpire(key: RedisKey, milliseconds: number | string): Promise<number>;
    increment(key: RedisKey): Promise<number>;
}
