import { InternalServerErrorException } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export type SentryConfig = {
  readonly dns: string;
};

export default registerAs('sentry', (): SentryConfig => {
  const sentry = {
    dns: process.env.SENTRY_DSN,
  };

  const schema = Joi.object({
    dns: Joi.string().required(),
  });

  const { error } = schema.validate(sentry, { abortEarly: false });

  if (error) {
    throw new InternalServerErrorException(
      `Environments failed: ${error.message}`,
    );
  }

  return sentry as SentryConfig;
});
