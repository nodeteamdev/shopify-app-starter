import { join } from 'path';
import { AppConfig, appConfig } from '@config/app.config';
import { jwtConfig } from '@config/jwt.config';
import { mailerConfig } from '@config/mailer.config';
import { ngrokConfig } from '@config/ngrok.config';
import { RedisConfig, redisConfig } from '@config/redis.config';
import { sentryConfig } from '@config/sentry.config';
import { shopifyConfig } from '@config/shopify.config';
import { swaggerConfig } from '@config/swagger.config';
import { SubscriptionModule } from '@modules/subscription/subscription.module';
import { AppController } from '@modules/app/app.controller';
import { AppService } from '@modules/app/app.service';
import { AuthModule } from '@modules/auth/auth.module';
import { EmailService } from '@modules/email/email.service';
import { GraphqlModule } from '@modules/graphql/graphql.module';
import { MandatoryWebhookModule } from '@modules/mandatory-webhook/mandatory-webhook.module';
import { ProductModule } from '@modules/product/product.module';
import { ShopModule } from '@modules/shop/shop.module';
import { ShopifyModule } from '@modules/shopify-api/shopify.module';
import { ShopifyAppInstallModule } from '@modules/shopify-app-install/shopify-app-install.module';
import { CSP } from '@modules/shopify-auth/middlewares/csp.middleware';
import { ShopifyAuthSessionService } from '@modules/shopify-auth/services/shopify-auth-session.service';
import { ShopifyAuthSessionRepository } from '@modules/shopify-auth/shopify-auth-session.repository';
import { ShopifyAuthModule } from '@modules/shopify-auth/shopify-auth.module';
import { UserModule } from '@modules/user/user.module';
import { WebhookModule } from '@modules/webhook/webhook.module';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from '@providers/prisma';
import { RedisThrottlerStorageService } from '@providers/redis/redis-throttler-storage.service';
import { RedisModule } from '@providers/redis/redis.module';
import { RedisModule as NestRedisModule } from '@songkeys/nestjs-redis';
import { Redis } from 'ioredis';
import { BulkOperationModule } from '@modules/bulk-operation/bulk-operation.module';
import { OrderModule } from '@modules/order/order.module';
import { MetafieldModule } from '@modules/metafield/metafield.module';

const logger: Logger = new Logger('AppModule');

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../public'),
    }),
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
    ShopifyAuthModule,
    ShopModule,
    SubscriptionModule,
    ShopifyModule,
    ProductModule,
    GraphqlModule,
    BulkOperationModule,
    OrderModule,
    MetafieldModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EmailService,
    ShopifyAuthSessionService,
    ShopifyAuthSessionRepository,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CSP).exclude('shopify-auth').forRoutes('*');
  }
}
