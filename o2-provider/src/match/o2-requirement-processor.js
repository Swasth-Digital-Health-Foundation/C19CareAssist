/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');

const { fetchPincodeMatchingProviders } = require('./match-providers');
const { decryptObject } = require('../services/encryption.service');
const { callHasura } = require('../services/util/hasura');

const maxIterations = process.env.O2_REQUIREMENT_MAX_ITERATIONS;

const persistO2Service = async (o2Requirement, o2Provider) => {
  const o2Service = {
    search_id: o2Requirement.uuid,
    type: o2Requirement.type,
    status: 'REQUESTED',
    provider_id: o2Provider.uuid,
  };
  const query = `
    mutation insert_o2_service($object: o2_service_insert_input!) {
      insert_o2_service_one(object: $object) {
        uuid
      }
    }
  `;
  const variable = {
    object: o2Service,
  };
  const response = await callHasura(query, variable, 'insert_o2_service');
  if (response.errors !== undefined) {
    logger.error(JSON.stringify(response.errors));
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to register event');
  }
  o2Service.uuid = response.data.insert_o2_service.returning.uuid;
  return o2Service;
};

const processO2Requirement = async (o2Requirement) => {
  let { iteration } = o2Requirement;
  if (iteration > maxIterations) {
    o2Requirement.active = false;
  } else {
    const location = {
      city: o2Requirement.city,
      pin_code: o2Requirement.pin_code,
    };
    let providers = await fetchPincodeMatchingProviders(location, iteration);
    while (providers.length === 0 && iteration < maxIterations) {
      iteration += 1;
      providers = fetchPincodeMatchingProviders(location, iteration);
    }
    if (providers.length === 0) {
      o2Requirement.active = false;
    } else {
      o2Requirement.iteration = iteration;
      // eslint-disable-next-line no-restricted-syntax
      for (const provider of providers) {
        let user = provider.o2_user;
        user = decryptObject(user);
        provider.o2_user.mobile = user.mobile;
        // TODO: send message to the provider
        persistO2Service(o2Requirement, provider);
      }
    }
  }
  // TODO: Get user mobile from db and send message to the user. Message could be 1. Requested providers OR 2. No providers found
  // TODO: update o2Requirement; new parameter o2Requirement.iteration
};

```
query getO2Requirement {
  o2_requirement(where: {active:{_eq:true}}) {
    uuid
    user_id
    type
    pin_code
    city
    address_detail
    created_at
    active
    o2_user {
      uuid
      name
      mobile
    }
    o2_services(where:{status:{_eq:"ACCEPTED"}}) {        // Only include encrypted fields
      o2_provider{
        o2_user{
          name
          mobile
        }
      }
    }
  }
}
```

const processO2RequirementReplies = async (o2Requirement) => {
  const replies = o2Requirement.o2_service;
  if (replies.length === 0) {
    // send message to user => no providers found
    // If iteration == maxIteration => closing the request
  } else {
    const providers = await decryptObject(replies);
    let providerDetailsMessage = '';
    if(providers.length === 1) {
      const user = providers[i].o2_provider.o2_user;
      providerDetailsMessage = `${user.name}: ${user.mobile}`;
    } else {
      for (let i = 0; i < providers.length; i++) {
        const user = providers[i].o2_provider.o2_user;
        providerDetailsMessage += `\n${i + 1}. ${user.name}: ${user.mobile}`;
      }
    }
    logger.info(providerDetailsMessage);
    // send message with provider details
  }
};

module.exports = {
  processO2Requirement,
  processO2RequirementReplies,
};
