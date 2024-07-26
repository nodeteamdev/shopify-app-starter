import * as path from 'node:path';
import { validateScheme } from '@config/utils/scheme-validator.helper';
import { LogLevel, Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { Utils } from '@services/utils.service';
import { z } from 'zod';

const scheme = z.object({
  port: z.number(),
  loggerLevel: z.array(
    z.union([
      z.literal('log' satisfies LogLevel),
      z.literal('error' satisfies LogLevel),
      z.literal('warn' satisfies LogLevel),
      z.literal('debug' satisfies LogLevel),
      z.literal('verbose' satisfies LogLevel),
      z.literal('fatal' satisfies LogLevel),
    ]),
  ),
  nodeEnv: z.string(),
  clientHost: z.string(),
  version: z.string(),
  rateLimitTtl: z.number(),
  rateLimitTimes: z.number(),
  sentryDns: z.string(),
  host: z.string(),
});

export type AppConfig = Required<z.infer<typeof scheme>>;

export const appConfig = registerAs('app', (): AppConfig => {
  const config: AppConfig = {
    port: Number(process.env.SERVER_PORT),
    loggerLevel: Utils.parseLogLevel(
      process.env.APP_LOGGER_LEVEL,
    ) as LogLevel[],
    nodeEnv: process.env.NODE_ENV,
    clientHost: process.env.CLIENT_HOST_NAME,
    // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires
    version: require(path.join(process.cwd(), 'package.json')).version,
    rateLimitTtl: Number(process.env.DEFAULT_RATE_LIMIT_TTL),
    rateLimitTimes: Number(process.env.DEFAULT_RATE_LIMIT_TIMES),
    sentryDns: process.env.SENTRY_DSN,
    host: process.env.API_HOST_NAME,
  };

  validateScheme(scheme, config, new Logger('AppConfig'));

  return config;
});
