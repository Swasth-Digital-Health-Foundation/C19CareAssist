const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');
const { default: axios } = require('axios');

const tenantId = process.env.ROOT_TENANT_ID;
const host = process.env.ENCRYPTION_SERVICE_HOST;
const encryptEndpoint = process.env.ENCRYPTION_SERVICE_ENCRYPT_ENDPOINT;
const decryptEndpoint = process.env.ENCRYPTION_SERVICE_DECRYPT_ENDPOINT;
const hashEndpoint = process.env.ENCRYPTION_SERVICE_HASH_ENDPOINT;

const encryptObject = async (object) => {
  let url = host + encryptEndpoint;
  let requestBody = {
    encryptionRequests: [
      {
        tenantId: tenantId,
        type: "Normal",
        value: object
      }
    ]
  };

  let response = await axios.post(url, requestBody);

  let encryptedValue = response.data[0].encrypted;
  let hashedValue = response.data[0].hashed;

  return { encryptedValue, hashedValue };
};

module.exports = {
  encryptObject,
};
