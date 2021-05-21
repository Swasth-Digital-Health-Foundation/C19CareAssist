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
  const GROUP_PINCODE = ['122', '110', '121', '201'];
  const { pin_code } = location;
  let data;
  if (GROUP_PINCODE.includes(pin_code.substr(0, 3))) {
    const fetchData = async () => {
      const promiseArr = GROUP_PINCODE.map(async (item) => {
        const res = await fetchPincodeBasedCityMatchingProviders({ pin_code: item });
        return res;
      });
      return Promise.all(promiseArr);
    };
    data = await fetchData();
  } else {
    data = await fetchPincodeBasedCityMatchingProviders({ pin_code });
  }
  return data;
};

module.exports = {
  fetchPincodeMatchingProviders,
  fetchPincodeBasedCityMatchingProviders,
  fetchGroupPincodeBasedCityMatchingProviders,
};
