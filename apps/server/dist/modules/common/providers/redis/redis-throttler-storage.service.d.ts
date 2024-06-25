import { ThrottlerStorage } from '@nestjs/throttler';
import { ThrottlerStorageOptions } from '@nestjs/throttler/dist/throttler-storage-options.interface';
import { ThrottlerStorageRecord } from '@nestjs/throttler/dist/throttler-storage-record.interface';
import { RedisService } from '@modules/common/providers/redis/redis.service';
export declare class RedisThrottlerStorageService implements ThrottlerStorage {
    private readonly redis;
    storage: Record<string, ThrottlerStorageOptions>;
    constructor(redis: RedisService);
    increment(key: string, ttl: number): Promise<ThrottlerStorageRecord>;
}
