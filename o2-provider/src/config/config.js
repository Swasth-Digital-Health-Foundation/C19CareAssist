const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
const { hasuraAdminSecret } = require('../validations/custom.validation');

dotenv.config({ path: path.join(__dirname, '../../.env') });
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    HASURA_ADMIN_SECRET: Joi.string().custom(hasuraAdminSecret).required(),
    HASURA_URL: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  hasuraAdminSecret: envVars.HASURA_ADMIN_SECRET,
  hasuraUrl: envVars.HASURA_URL,
};
