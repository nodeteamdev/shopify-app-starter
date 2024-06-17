import { validateScheme } from '@config/utils/scheme-validator.helper';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const scheme = z.object({
  password: z.string(),
});

export type SwaggerConfig = Required<z.infer<typeof scheme>>;

export const swaggerConfig = registerAs('swagger', (): SwaggerConfig => {
  const config: SwaggerConfig = {
    password: process.env.SWAGGER_PASSWORD!,
  };

  try {
    validateScheme(scheme, config, new Logger('SwaggerConfig'));
  } catch (error) {
    throw new InternalServerErrorException(
      `Environments failed: ${error.message}`,
    );
  }

  return config;
});
