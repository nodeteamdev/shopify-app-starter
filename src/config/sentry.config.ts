import { validateScheme } from '@config/utils/scheme-validator.helper';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const scheme = z.object({
  dns: z.string().url(),
});

export type SentryConfig = Required<z.infer<typeof scheme>>;

export const sentryConfig = registerAs('sentry', (): SentryConfig => {
  const config: SentryConfig = {
    dns: process.env.SENTRY_DSN!,
  };

  try {
    validateScheme(scheme, config, new Logger('SentryConfig'));
  } catch (error) {
    throw new InternalServerErrorException(
      `Environments failed: ${error.message}`,
    );
  }

  return config;
});
