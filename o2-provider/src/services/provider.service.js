const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');
const { createUser } = require('./user.service');

/**
 * Create a user
 * @param {Object} providerBody
 * @returns {Promise<User>}
 */
const registerProvider = async (providerBody) => {
  logger.info(JSON.stringify(providerBody));
  await validateRegisterProvider(providerBody);
  let provider = providerBody.message.provider;
  let user = {
    name: provider.name,
    mobile: provider.contact.mobile,
    email: provider.contact.email,
    type: 'supplier'
  };
  let user = await createUser(user);

  let providerDbObject = {
    user_id: user.uuid,
    status: provider.status,
    pin_code: provider.located_at.pin_code
  }

  providerDbObject = await persistProvider(providerDbObject);

  return {
    uuid: providerDbObject.uuid
  };
};

const validateRegisterProvider = async (providerBody) => {

}

const validateUpdateProvider = async (providerBody) => {

}

const persistProvider = async (provider) => {
  provider.uuid = 'dummy';
  return provider;
}

module.exports = {
  registerProvider,
};
