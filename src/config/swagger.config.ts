import { InternalServerErrorException } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export type SwaggerConfig = {
  readonly password: string;
}

export default registerAs('swagger', () => {
  const swagger = {
    password: process.env.SWAGGER_PASSWORD,
  };

  const schema = Joi.object({
    password: Joi.string().required(),
  });

  const { error } = schema.validate(swagger, { abortEarly: false });

  if (error) {
    throw new InternalServerErrorException(`Environments failed: ${error.message}`);
  }

  return swagger as SwaggerConfig;
});
