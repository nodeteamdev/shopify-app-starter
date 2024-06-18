import { validateScheme } from '@config/utils/scheme-validator.helper';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const scheme = z.object({
  url: z.string().url(),
});

export type RedisConfig = Required<z.infer<typeof scheme>>;

export const redisConfig = registerAs('redis', (): RedisConfig => {
  const config: RedisConfig = {
    url: process.env.REDIS_URL!,
  };

  try {
    validateScheme(scheme, config, new Logger('RedisConfig'));
  } catch (error) {
    throw new InternalServerErrorException(
      `Environments failed: ${error.message}`,
    );
  }

  return config;
});
