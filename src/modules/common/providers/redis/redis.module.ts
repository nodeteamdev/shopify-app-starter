import { Module } from '@nestjs/common';
import { RedisThrottlerStorageService } from '@providers/redis/redis-throttler-storage.service';
import { RedisService } from '@providers/redis/redis.service';

@Module({
  providers: [RedisService, RedisThrottlerStorageService],
  exports: [RedisService, RedisThrottlerStorageService],
})
export class RedisModule {}
