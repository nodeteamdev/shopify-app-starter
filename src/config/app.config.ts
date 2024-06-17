import * as path from 'path';
import { registerAs } from '@nestjs/config';
import { LogLevel } from '@nestjs/common/services/logger.service';

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
  readonly clientHost: string;
  readonly loggerLevel: LogLevel[];
  readonly env: string;
  readonly version: string;
};
export default registerAs(
  'app',
  (): AppConfig => ({
    port: +process.env.APP_PORT || 3000,
    baseUrl: process.env.BASE_URL || `http://localhost:${process.env.APP_PORT}`,
    host: process.env.API_HOST_NAME || `localhost:${process.env.APP_PORT}`,
    clientHost: process.env.CLIENT_HOST_NAME,
    loggerLevel: parseLogLevel(
      process.env.APP_LOGGER_LEVEL || 'log,error,warn,debug,verbose',
    ),
    env: process.env.NODE_ENV || 'development',
    // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires,import/no-dynamic-require
    version: require(path.join(process.cwd(), 'package.json')).version,
  }),
);
