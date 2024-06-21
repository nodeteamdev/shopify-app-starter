import { Injectable, Logger } from '@nestjs/common';
import { InjectRedis } from '@songkeys/nestjs-redis';
import { Redis } from 'ioredis';
import { RedisKey } from 'ioredis/built/utils/RedisCommander';

@Injectable()
export class RedisService {
  private readonly logger: Logger = new Logger(RedisService.name);

  constructor(@InjectRedis() private readonly redisClient: Redis) {}

  public isExist(key: RedisKey): Promise<number> {
    return this.redisClient.exists(key);
  }

  /**
   * Get the time to live for a key in seconds
   * If the key exists and has a timeout set, the command returns the remaining time to live in seconds.
   * If the key does not exist -2.
   * If the key exists but does not have a timeout, it returns -1.
   * @param key string
   */
  public getTtl(key: RedisKey): Promise<number> {
    return this.redisClient.ttl(key);
  }

  public setExpire(key: RedisKey, seconds: number | string): Promise<number> {
    return this.redisClient.expire(key, seconds);
  }

  public setOne(key: RedisKey, value: string | Buffer | number): Promise<'OK'> {
    return this.redisClient.set(key, value);
  }

  public appendOne(
    key: RedisKey,
    value: string | Buffer | number,
  ): Promise<number> {
    return this.redisClient.append(key, value);
  }

  public getOne(key: RedisKey): Promise<string | null> {
    return this.redisClient.get(key);
  }

  public async setOneWithExpire(
    key: RedisKey,
    value: string | Buffer | number,
    seconds: number | string,
  ): Promise<'OK'> {
    try {
      await this.setOne(key, value);
      await this.setExpire(key, seconds);
    } catch (error) {
      await this.delete(key);

      throw error;
    }

    return 'OK';
  }

  public setExpireForMany(
    keys: RedisKey[],
    seconds: number | string,
  ): Promise<number[]> {
    return Promise.all(keys.map((key) => this.setExpire(key, seconds)));
  }

  public setMany(
    keyValues: [RedisKey, string | Buffer | number][],
  ): Promise<'OK'> {
    return this.redisClient.mset(keyValues.flat());
  }

  public async setManyWithExpire(
    keyValues: [RedisKey, string | Buffer | number][],
    seconds: number | string,
  ): Promise<'OK'> {
    try {
      await this.setMany(keyValues);
      await this.setExpireForMany(
        keyValues.map(([k]) => k),
        seconds,
      );
    } catch (error) {
      this.logger.error(
        `Error occurred during attempt of setting many with expire: : ${error.message}`,
        error,
      );

      await this.deleteMany(keyValues.map(([k]) => k));

      throw error;
    }

    return 'OK';
  }

  public getMany(keys: RedisKey[]): Promise<(string | null)[]> {
    return this.redisClient.mget(keys);
  }

  public delete(key: RedisKey): Promise<number> {
    return this.redisClient.del(key);
  }

  public deleteMany(keys: RedisKey[]): Promise<number> {
    return this.redisClient.del(keys);
  }

  public getKeys(pattern: string | `${string}*`): Promise<string[]> {
    return this.redisClient.keys(pattern);
  }

  public setManyToHashMap(
    key: RedisKey,
    hashValues:
      | object
      | Map<string | Buffer | number, string | Buffer | number>,
  ): Promise<'OK'> {
    return this.redisClient.hmset(key, hashValues);
  }

  public getManyFromHashMap(
    key: RedisKey,
    fields?: string[],
  ): Promise<(string | null)[]> {
    return this.redisClient.hmget(key, ...fields);
  }

  public getHashMapKeys(key: RedisKey): Promise<string[]> {
    return this.redisClient.hkeys(key);
  }

  public deleteHashMapKeys(key: RedisKey, keys: RedisKey[]): Promise<number> {
    return this.redisClient.del(key, ...keys);
  }

  public deleteHashMap(key: RedisKey): Promise<number> {
    return this.redisClient.del(key);
  }

  public rpush(key: RedisKey, ...elements: number[]): Promise<number> {
    return this.redisClient.rpush(key, ...elements);
  }

  public ttl(key: RedisKey): Promise<number> {
    return this.redisClient.ttl(key);
  }

  public pexpire(
    key: RedisKey,
    milliseconds: number | string,
  ): Promise<number> {
    return this.redisClient.pexpire(key, milliseconds);
  }

  public increment(key: RedisKey): Promise<number> {
    return this.redisClient.incr(key);
  }
}
