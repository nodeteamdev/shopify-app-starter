import { registerAs } from '@nestjs/config';

export type NgrokConfig = {
  readonly domain: string;
  readonly authToken: string;
};

export default registerAs(
  'ngrok',
  (): NgrokConfig => ({
    domain: process.env.NGROK_DOMAIN!,
    authToken: process.env.NGROK_AUTHTOKEN!,
  }),
);
