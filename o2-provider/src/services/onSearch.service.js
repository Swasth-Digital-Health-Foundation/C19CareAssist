const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { callHasura } = require('./util/hasura');
const { getUserIdByMobile } = require('./user.service');
const logger = require('../config/logger');

const persistService = async (service) => {
  const query = `
      mutation insert_o2_service($objects: [o2_service_insert_input!]!) {
        insert_o2_service(objects: $objects) {
          returning {
            uuid
          }
        }
      }
    `;
  const variable = {
    objects: service,
  };
  const response = await callHasura(query, variable, 'insert_o2_service');
  if (response.errors !== undefined) {
    logger.error(JSON.stringify(response.errors));
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to register event');
  }
  // service.uuid = response.data.insert_o2_service.returning.uuid;
  return service;
};

/**
 * On search
 * @param {Object} serviceBody
 * @returns {Promise<User>}
 */
const registerService = async (serviceBody) => {
  const { services } = serviceBody;
  let serviceDbObjects = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const service of services) {
    const providerId = await getUserIdByMobile(service.mobile, 'supplier');
    if (providerId.length === 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'No supplier registered for this mobile!');
    }
    const serviceDbObject = {
      search_id: service.search_id,
      provider_id: providerId[0].o2_providers[0].uuid,
      type: service.type,
      expires_at: service.expires_at,
      status: service.status,
    };
    serviceDbObjects.push(serviceDbObject);
  }
  serviceDbObjects = await persistService(serviceDbObjects);
};

module.exports = {
  registerService,
};
