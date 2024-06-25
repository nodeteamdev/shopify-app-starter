import { LogLevel } from '@nestjs/common';

export class Utils {
  static parseLogLevel(level: string | undefined): LogLevel[] {
    if (!level) {
      return ['log', 'error', 'warn', 'debug', 'verbose'];
    }

    if (level === 'none') {
      return [];
    }

    return level.split(',') as LogLevel[];
  }
}
