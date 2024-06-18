import { AppConfig, appConfig } from '@config/app.config';
import { jwtConfig } from '@config/jwt.config';
import { mailerConfig } from '@config/mailer.config';
import { ngrokConfig } from '@config/ngrok.config';
import { RedisConfig, redisConfig } from '@config/redis.config';
import { sentryConfig } from '@config/sentry.config';
import shopifyConfig from '@config/shopify.config';
import { swaggerConfig } from '@config/swagger.config';
import { AppController } from '@modules/app/app.controller';
import { AppService } from '@modules/app/app.service';
import { AuthModule } from '@modules/auth/auth.module';
import { EmailService } from '@modules/email/email.service';
import { MandatoryWebhookModule } from '@modules/mandatory-webhook/mandatory-webhook.module';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';
import { UserModule } from '@modules/user/user.module';
import { WebhookModule } from '@modules/webhook/webhook.module';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from '@providers/prisma';
import { RedisThrottlerStorageService } from '@providers/redis/redis-throttler-storage.service';
import { RedisModule } from '@providers/redis/redis.module';
import { RedisModule as NestRedisModule } from '@songkeys/nestjs-redis';
import { Redis } from 'ioredis';

const logger: Logger = new Logger('AppModule');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        sentryConfig,
        redisConfig,
        ngrokConfig,
        swaggerConfig,
        mailerConfig,
        jwtConfig,
        shopifyConfig,
      ],
    }),
    PrismaModule,
    NestRedisModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const redisConfig = configService.get<RedisConfig>('redis')!;
        const redisUrl = new URL(redisConfig.url);

        return {
          config: {
            url: redisUrl.toString(),
            onClientCreated: (client: Redis): void => {
              client.on('ready', () =>
                logger.log(`Redis is started on port ${redisUrl.port}`),
              );
              client.on('error', (error) => {
                logger.error(error);
              });
              client.on('restart', () =>
                logger.warn('Attempt to restart the redis server'),
              );
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    ThrottlerModule.forRootAsync({
      useFactory: (
        redis: RedisThrottlerStorageService,
        configService: ConfigService,
      ) => {
        const appConfig: AppConfig = configService.get<AppConfig>('app');

        const ttl: number = appConfig.rateLimitTtl;
        const limit: number = appConfig.rateLimitTimes;

        return {
          throttlers: [{ ttl, limit }],
          storage: redis,
        };
      },
      inject: [RedisThrottlerStorageService, ConfigService],
      imports: [RedisModule, ConfigModule],
    }),
    JwtModule.register({
      global: true,
    }),
    UserModule,
    WebhookModule,
    ShopifyAppInstallModule,
    MandatoryWebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
