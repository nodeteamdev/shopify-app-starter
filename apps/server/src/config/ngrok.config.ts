import { validateScheme } from '@config/utils/scheme-validator.helper';
import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const scheme = z.object({
  domain: z.string(),
  authToken: z.string(),
});

export type NgrokConfig = Required<z.infer<typeof scheme>>;

export const ngrokConfig = registerAs('ngrok', (): NgrokConfig => {
  const config: NgrokConfig = {
    domain: process.env.NGROK_DOMAIN!,
    authToken: process.env.NGROK_AUTHTOKEN!,
  };

  validateScheme(scheme, config, new Logger('NgrokConfig'));

  return config;
});
