import { InternalServerErrorException, Logger } from '@nestjs/common';
import { z } from 'zod';
import { ZodRawShape } from 'zod/lib/types';
import { sendErrorToSentry } from '@helpers/send-error-to-sentry.helper';

export function validateScheme<T extends ZodRawShape>(
  scheme: z.ZodObject<T>,
  config: Record<string, any>,
  logger: Logger,
): void {
  try {
    scheme.parse(config);

    logger.log('Config loaded successfully');
  } catch (error) {
    logger.error('Config validation failed');
    logger.error(error);

    sendErrorToSentry(error, { config });

    throw new InternalServerErrorException(
      `Environments failed: ${error.message}`,
    );
  }
}
