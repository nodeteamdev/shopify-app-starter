import * as Sentry from '@sentry/node';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import basicAuth from 'express-basic-auth';
import { AppConfig } from '@config/app.config';
import { NgrokConfig } from '@config/ngrok.config';
import { SentryConfig } from '@config/sentry.config';
import { SwaggerConfig } from '@config/swagger.config';
import { NodeEnvsEnum } from '@enums/node-envs.enum';
import { AppModule } from '@modules/app/app.module';
import {
  Logger,
  RequestMethod,
  ValidationPipe,
  VersioningOptions,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import SwaggerCustomOptions from '@options/swagger-custom.options';
import { useContainer } from 'class-validator';

async function bootstrap(): Promise<{
  appConfig: AppConfig;
  ngrokConfig: NgrokConfig;
}> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bodyParser: true,
    rawBody: true,
  });

  app.use(cookieParser());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService = app.get(ConfigService);
  const appConfig: AppConfig = configService.get('app');
  const swaggerConfig: SwaggerConfig = configService.get('swagger');
  const sentryConfig: SentryConfig = configService.get('sentry')!;

  if (appConfig.nodeEnv === NodeEnvsEnum.PRODUCTION) {
    const newrelic = require('newrelic');

    newrelic.instrumentLoadedModule('app', app);
  }
  /**
   * Enable Helmet
   */
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: false,
    }),
  );

  {
    /**
     * Enable Logger
     */
    const options = appConfig.loggerLevel;

    app.useLogger(options);
  }
  {
    /**
     * Enable CORS
     */

    // TODO: we need to change it on stag and prod
    const options = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
      allowedHeaders: 'Content-Type, Accept, Authorization, ngrok-skip-browser-warning',
    };

    app.enableCors(options);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
    }),
  );

  {
    /**
     * Set global prefix [api] for all routes
     */
    const options = {
      exclude: [{ path: '/', method: RequestMethod.GET }],
    };

    app.setGlobalPrefix('api', options);
  }

  {
    /**
     * Enable versioning for all routes
     */
    const options: VersioningOptions = {
      type: VersioningType.URI,
      defaultVersion: '1',
    };

    app.enableVersioning(options);
  }

  {
    app.use(
      ['/docs', '/documentation'],
      /**
       * Setup Swagger API documentation
       */
      // @ts-ignore
      basicAuth({
        challenge: true,
        users: {
          admin: swaggerConfig.password,
        },
      }),
    );

    const options = new DocumentBuilder()
      .setTitle('Api v1')
      .setDescription('Shopify App API v1')
      .setVersion('1.0')
      .addBearerAuth({ in: 'header', type: 'http' })
      .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('docs', app, document, SwaggerCustomOptions);
  }

  if (
    appConfig.nodeEnv === NodeEnvsEnum.PRODUCTION ||
    appConfig.nodeEnv === NodeEnvsEnum.STAGING
  ) {
    /**
     * Enable Sentry errors collection
     */
    Sentry.init({
      dsn: sentryConfig.dns,
      tracesSampleRate: 1.0,
      release: '0.0.1',
      environment: appConfig.nodeEnv,
    });
  }

  await app.listen(appConfig.port);

  return {
    appConfig,
    ngrokConfig: configService.get<NgrokConfig>('ngrok') as NgrokConfig,
  };
}

bootstrap().then(async ({ appConfig }): Promise<void> => {
  Logger.log(`Running in http://localhost:${appConfig.port}`, 'Bootstrap');
  Logger.log(`Docs in http://localhost:${appConfig.port}/docs`, 'Swagger');
});
