const env = require('node-env-file');

env(__dirname + "/.env");

module.exports = {
  Port: process.env.PORT,
  aws_ses_api_version: process.env.AWS_SES_API_VERSION,
  aws_ses_access_key: process.env.AWS_SES_ACCESS_KEY_ID,
  aws_ses_secret_key: process.env.AWS_SES_SECRET_ACCESS_KEY,
  aws_ses_region: process.env.AWS_SES_REGION,
};
