import { Logger, Module } from '@nestjs/common';
import { AppController } from '@modules/app/app.controller';
import { AppService } from '@modules/app/app.service';
import PrismaModule from '@providers/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@config/app.config';
import sentryConfig from '@config/sentry.config';
import redisConfig from '@config/redis.config';
import ngrokConfig from '@config/ngrok.config';
import swaggerConfig from '@config/swagger.config';
import RedisModule from '@providers/redis/redis.module';
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
      ],
    }),
    PrismaModule,
    RedisModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
