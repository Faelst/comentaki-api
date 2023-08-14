import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'staging', 'production', 'test')
    .default('development')
    .required(),
  PORT: Joi.number().default(3000).required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_USENAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
});

export const validationOptions = {
  allowUnknown: true,
  abortEarly: true,
  skipMissingProperties: false,
};
