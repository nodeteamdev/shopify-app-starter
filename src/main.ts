import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app/app.module';
import { AppConfig } from '@config/app.config';
import { NgrokConfig } from '@config/ngrok.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { SentryConfig } from '@config/sentry.config';
import helmet from 'helmet';
import { useContainer } from 'class-validator';
import { Logger, RequestMethod, ValidationPipe, VersioningOptions, VersioningType } from '@nestjs/common';
import  * as basicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import SwaggerCustomOptions from '@options/swagger-custom.options';
import { Listener } from '@ngrok/ngrok';
import { SwaggerConfig } from '@config/swagger.config';
async function bootstrap(): Promise<{
  appConfig: AppConfig;
  ngrokConfig: NgrokConfig;
}> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService = app.get(ConfigService);
  const appConfig: AppConfig = configService.get('app');
  const swaggerConfig: SwaggerConfig = configService.get('swagger');
  const sentryConfig: SentryConfig = configService.get<SentryConfig>('sentry')!;

  if (appConfig.isProduction) {
    const newrelic = require('newrelic');

    newrelic.instrumentLoadedModule('app', app);
  }
  /**
   * Enable Helmet
   */
  app.use(
    helmet({
      contentSecurityPolicy: false,
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
    /**
     * Setup Swagger API documentation
     */
    app.use(
      ['/docs', '/documentation'],
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


  if (appConfig.env === 'production' || appConfig.env === 'staging') {
    /**
     * Enable Sentry errors collection
     */
    Sentry.init({
      dsn: sentryConfig.dns,
      tracesSampleRate: 1.0,
      release: '0.0.1',
      environment: appConfig.env,
    });
  }

  await app.listen(appConfig.port);

  return {
    appConfig,
    ngrokConfig: configService.get<NgrokConfig>('ngrok') as NgrokConfig,
  };
}

bootstrap().then(async ({ appConfig, ngrokConfig }): Promise<void> => {
  Logger.log(`Running in http://localhost:${appConfig.port}`, 'Bootstrap');
  Logger.log(`Docs in http://localhost:${appConfig.port}/docs`, 'Swagger');

  if (appConfig.env === 'development' && ngrokConfig.domain) {
    const ngrok = await import('@ngrok/ngrok');

    const listener: Listener = await ngrok.forward({
      port: appConfig.port,
      domain: ngrokConfig.domain,
      authtoken: ngrokConfig.authToken,
    });

    Logger.log(`Ngrok ingress established at: ${listener.url()}`, 'Ngrok');
    Logger.log(`Docs at: ${listener.url()}/docs`, 'Swagger');
  } else {
    Logger.log(`Running at https://${appConfig.host}`, 'Bootstrap');
    Logger.log(`Docs at https://${appConfig.host}/docs`, 'Swagger');
  }
});

