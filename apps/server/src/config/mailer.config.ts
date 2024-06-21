import { validateScheme } from '@config/utils/scheme-validator.helper';
import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const scheme = z.object({
  host: z.string(),
  port: z.number(),
  secure: z.boolean(),
  user: z.object({
    email: z.string(),
    password: z.string(),
  }),
  emailFrom: z.string(),
  adminEmail: z.string(),
});

export type MailerConfig = Required<z.infer<typeof scheme>>;

export const mailerConfig = registerAs('mailer', (): MailerConfig => {
  const secure: string | undefined = process.env.MAILER_SECURE;

  let isSecure = undefined;

  if (secure === 'false') isSecure = false;
  if (secure === 'true') isSecure = true;

  const config: MailerConfig = {
    host: process.env.MAILER_HOST,
    port: Number(process.env.MAILER_PORT),
    secure: isSecure,
    user: {
      email: process.env.MAILER_USER_EMAIL,
      password: process.env.MAILER_USER_PASSWORD,
    },
    adminEmail: process.env.ADMIN_EMAIL,
    emailFrom: process.env.EMAIL_FROM,
  };

  validateScheme(scheme, config, new Logger('MailerConfig'));

  return config;
});
