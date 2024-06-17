import { Injectable } from '@nestjs/common';
import { ThrottlerStorage } from '@nestjs/throttler';
import { ThrottlerStorageOptions } from '@nestjs/throttler/dist/throttler-storage-options.interface';
import { ThrottlerStorageRecord } from '@nestjs/throttler/dist/throttler-storage-record.interface';
import { RedisService } from '@modules/common/providers/redis/redis.service';

@Injectable()
export class RedisThrottlerStorageService implements ThrottlerStorage {
  storage!: Record<string, ThrottlerStorageOptions>;

  constructor(private readonly redis: RedisService) {}

  async increment(key: string, ttl: number): Promise<ThrottlerStorageRecord> {
    const throttlerKey = 'RATE_LIMITS;' + key;

    const totalHits = await this.redis.rpush(
      throttlerKey,
      Date.now() + ttl * 1000,
    );
    const timeToExpire = await this.redis.ttl(throttlerKey);

    if (timeToExpire === -1) {
      await this.redis.pexpire(throttlerKey, ttl * 1000);
    }

    return {
      totalHits,
      timeToExpire,
    };
  }
}
