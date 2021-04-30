const httpStatus = require('http-status');
const { default: axios } = require('axios');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');

const tenantId = process.env.ROOT_TENANT_ID;
const host = process.env.ENCRYPTION_SERVICE_HOST;
const encryptEndpoint = process.env.ENCRYPTION_SERVICE_ENCRYPT_ENDPOINT;
const decryptEndpoint = process.env.ENCRYPTION_SERVICE_DECRYPT_ENDPOINT;
const hashEndpoint = process.env.ENCRYPTION_SERVICE_HASH_ENDPOINT;

const encryptObject = async (object) => {
  const url = host + encryptEndpoint;
  const requestBody = {
    encryptionRequests: [
      {
        tenantId,
        type: 'Normal',
        value: object,
      },
    ],
  };

  const response = await axios.post(url, requestBody);

  const encryptedValue = response.data[0].encrypted;
  const hashedValue = response.data[0].hashed;

  return { encryptedValue, hashedValue };
};

module.exports = {
  encryptObject,
};
