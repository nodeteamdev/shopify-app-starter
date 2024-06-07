import { InternalServerErrorException } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export type RedisConfig = {
  readonly url: string,
}

export default registerAs('redis', (): RedisConfig => {
  const redis = {
    url: process.env.REDIS_URL,
  };

  const schema = Joi.object({
    url: Joi.string().required(),
  });

  const { error } = schema.validate(redis, { abortEarly: false });

  if (error) {
    throw new InternalServerErrorException(`Environments failed: ${error.message}`);
  }

  return redis as RedisConfig;
});
