import { InternalServerErrorException } from '@nestjs/common';
import { LogLevel } from '@nestjs/common/services/logger.service';
import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import * as path from 'path';

function parseLogLevel(level: string | undefined): LogLevel[] {
  if (!level) {
    return ['log', 'error', 'warn', 'debug', 'verbose'];
  }

  if (level === 'none') {
    return [];
  }

  return level.split(',') as LogLevel[];
}

export type AppConfig = {
  readonly port: number;
  readonly baseUrl: string;
  readonly host: string;
  readonly loggerLevel: LogLevel[];
  readonly env: string;
  readonly version: string;
  readonly isProduction: boolean;
  readonly myOrdersUrl: string;
};

export default registerAs(
  'app',
  (): AppConfig => {
    const app = {
      port: Number(process.env.APP_PORT),
      baseUrl: process.env.BASE_URL,
      host: process.env.API_HOST_NAME,
      loggerLevel: parseLogLevel(process.env.APP_LOGGER_LEVEL),
      env: process.env.NODE_ENV,
      // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires,import/no-dynamic-require
      version: require(path.join(process.cwd(), 'package.json')).version,
      isProduction: process.env.NODE_ENV === 'production',
      myOrdersUrl: process.env.MY_ORDERS_URL || 'https://onix-systems-artcane-ai-frontend.staging.onix.ua/en/profile/orders',
    };

    const schema = Joi.object({
      port: Joi.number().required(),
      baseUrl: Joi.string().required(),
      host: Joi.string().required(),
      loggerLevel: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
      env: Joi.string().required(),
      version: Joi.string().required(),
      isProduction: Joi.boolean().required(),
      myOrdersUrl: Joi.string().required(),
    });

    const { error } = schema.validate(app, { abortEarly: false });

    if (error) {
      throw new InternalServerErrorException(`Environments failed: ${error.message}`);
    }

    return app as AppConfig;
  },
);
