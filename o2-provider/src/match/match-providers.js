/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
const { callHasura } = require('../services/util/hasura');

const fetchPincodeMatchingProviders = async (location, iteration) => {
  const { pin_code } = location;
  let knownPin = '';
  const query = `
    query getO2Providers($find_pin: String!, $knowm_pin: String) {
      o2_provider(where: {pin_code: {_like: $find_pin, _nilike: $knowm_pin}, status: {_eq: "ACTIVE"}}) {
        uuid
        pin_code
        city
        o2_user {
          mobile
        }
      }
    }
  `;
  const findPin = `${pin_code.substr(0, pin_code.length - iteration)}%`;
  if (iteration > 0) {
    knownPin = `${pin_code.substr(0, pin_code.length - iteration + 1)}%`;
  }

  const variables = {
    find_pin: findPin,
    knowm_pin: knownPin,
  };

  const response = await callHasura(query, variables, 'getO2Providers');
  const data = response.data.o2_provider;

  return data;
};

const fetchPincodeBasedCityMatchingProviders = async (location, iteration) => {
  const query = `
    query getO2Providers($find_pin: String!) {
      o2_provider(where: {pin_code: {_like: $find_pin}, status: {_eq: "ACTIVE"}}) {
        uuid
        pin_code
        city
        o2_user {
          mobile
        }
      }
    }
  `;
  let { pin_code } = location;
  pin_code = `${pin_code.substr(0, 3)}%`;
  const variable = {
    find_pin: pin_code,
  };
  const response = await callHasura(query, variable, 'getO2Providers');
  const data = response.data.o2_provider;

  return data;
};

const fetchGroupPincodeBasedCityMatchingProviders = async (location) => {
  const { pin_code } = location;
  const str = process.env.PINCODE_GROUPS;
  const pincodeGroups = JSON.parse(str);

  let data;
  for (const group in pincodeGroups) {
    const pincodes = pincodeGroups[group];
    if (pincodes.includes(pin_code.substr(0, 3))) {
      data = [];
      for (const pincode of pincodes) {
        const providers = await fetchPincodeBasedCityMatchingProviders({ pin_code: pincode });
        data.push(...providers);
      }
      break;
    }
  }
  if (!data) {
    data = await fetchPincodeBasedCityMatchingProviders({ pin_code });
  }
  return data;
};

module.exports = {
  fetchGroupPincodeBasedCityMatchingProviders,
};
