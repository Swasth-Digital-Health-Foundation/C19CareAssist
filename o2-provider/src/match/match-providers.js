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

const fetchCityMatchingProviders = async (location, iteration) => {
  if (iteration > 0) {
    return [];
  }
  const { city } = location;
  const query = `
    query getO2Providers($city: String!) {
      o2_provider(where: {city: {_eq: $city}}) {
        uuid
        pin_code
        city
      }
    }
  `;
  const variables = {
    city,
  };

  const response = callHasura(query, variables, 'getO2Providers');
  const data = response.data.o2_provider;

  return data;
};

module.exports = {
  fetchPincodeMatchingProviders,
  fetchCityMatchingProviders,
};
