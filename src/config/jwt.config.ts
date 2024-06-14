import { validateScheme } from '@config/utils/scheme-validator.helper';
import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const baseScheme = z.object({
  secret: z.string(),
  expTime: z.object({
    milliseconds: z.number(),
    seconds: z.number(),
  }),
});

const scheme = z.object({
  access: baseScheme,
  refresh: baseScheme,
  resetPassword: baseScheme,
  verifyEmail: baseScheme,
});

export type JwtConfig = Required<z.infer<typeof scheme>>;

export const jwtConfig = registerAs('jwt', (): JwtConfig => {
  const config: JwtConfig = {
    access: {
      secret: process.env.ACCESS_JWT_SECRET,
      expTime: {
        milliseconds: Number(process.env.ACCESS_JWT_EXP_TIME),
        seconds: Math.ceil(Number(process.env.ACCESS_JWT_EXP_TIME) / 1000),
      },
    },
    refresh: {
      secret: process.env.REFRESH_JWT_SECRET,
      expTime: {
        milliseconds: Number(process.env.REFRESH_JWT_EXP_TIME),
        seconds: Math.ceil(Number(process.env.REFRESH_JWT_EXP_TIME) / 1000),
      },
    },
    resetPassword: {
      secret: process.env.RESET_PASSWORD_JWT_SECRET,
      expTime: {
        milliseconds: Number(process.env.RESET_PASSWORD_JWT_EXP_TIME),
        seconds: Math.ceil(
          Number(process.env.RESET_PASSWORD_JWT_EXP_TIME) / 1000,
        ),
      },
    },
    verifyEmail: {
      secret: process.env.VERIFY_EMAIL_JWT_SECRET,
      expTime: {
        milliseconds: Number(process.env.VERIFY_EMAIL_JWT_EXP_TIME),
        seconds: Math.ceil(
          Number(process.env.VERIFY_EMAIL_JWT_EXP_TIME) / 1000,
        ),
      },
    },
  };

  validateScheme(scheme, config, new Logger('JwtConfig'));

  return config;
});
