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
  validateRegisterProvider(providerBody);
  // create user
  // persist provider

  if (false) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Provider mobile already taken');
  }
  // const user = await User.create(providerBody);
  return {};
};

const validateRegisterProvider = async (providerBody) => {

}

const validateUpdateProvider = async (providerBody) => {

}

const persistProvider = async (provider) => {
  // 
}

module.exports = {
  registerProvider,
};
