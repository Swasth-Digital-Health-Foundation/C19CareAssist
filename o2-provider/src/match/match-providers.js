/* eslint-disable camelcase */
const { callHasura } = require('../services/util/hasura');

const fetchPincodeMatchingProviders = async (location, iteration) => {
  let { pin_code } = location;
  let query;
  if (iteration === 0) {
    query = `
      query getO2Providers($pin_code: String!) {
        o2_provider(where: {pin_code: {_eq: $pin_code}}) {
          uuid
          pin_code
          city
          o2_user{
            mobile
          }
        }
      }
    `;
  } else {
    query = `
      query getO2Providers($pin_code: String!) {
        o2_provider(where: {pin_code: {_like: $pin_code}}) {
          uuid
          pin_code
          city
          o2_user{
            mobile
          }
        }
      }
    `;
    pin_code = pin_code.slice(0, -iteration);
    pin_code += '%';
  }

  const variables = {
    pin_code,
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
