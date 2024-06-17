import Redis, { Redis as RedisType, Cluster as ClusterType } from 'ioredis';
import { URL } from 'url';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import RedisClient from '@providers/redis/redis.client';

function getFactory(name: string) {
  return (config: ConfigService): Promise<RedisType | ClusterType> => {
    const uri = config.get(`redis.url`);
    const newUri = new URL(uri);

    newUri.searchParams.set(
      'keyPrefix',
      `${newUri.searchParams.get('keyPrefix')}`,
    );

    const client = newUri.searchParams.get('isCluster') === 'true'
      ? new Redis.Cluster([`${newUri}`])
      : new Redis(`${newUri}`);

    return new Promise((resolve, reject) => {
      client
        .setMaxListeners(30)
        .on('connect', () => {
          Logger.log(`Redis connected (${name})`);
        })
        .on('error', (error) => {
          Logger.error(
            `Redis error (${name}): ${error?.name ?? error?.message ?? error}`,
          );
          reject(error);
        })
        .on('ready', () => {
          Logger.log(`Redis ready (${name})`);
          resolve(client);
        })
        .on('restart', () => {
          Logger.log(`Redis restart (${name})`);
        });
    });
  };
}

@Module({})
export default class RedisModule {
  static forRoot(factoryName = 'main'): DynamicModule {
    return factoryName === 'main'
      ? {
        module: RedisModule,
        providers: [
          {
            inject: [ConfigService],
            useFactory: getFactory(factoryName),
            provide: RedisClient,
          },
        ],
        exports: [RedisClient],
      }
      : {
        module: RedisModule,
        providers: [
          {
            inject: [ConfigService],
            useFactory: getFactory(factoryName),
            provide: `${factoryName}Redis`,
          },
        ],
        exports: [`${factoryName}Redis`],
      };
  }
}
