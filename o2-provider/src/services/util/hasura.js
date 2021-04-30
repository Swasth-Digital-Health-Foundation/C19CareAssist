const axios = require('axios');

const hasuraAdminSecret = process.env.HASURA_ADMIN_SECRET;
const hasuraUrl = process.env.HASURA_URL;

const headers = {
  'x-hasura-admin-secret': hasuraAdminSecret,
};

const callHasura = async (query, variables, operationName) => {
  let response = await axios.post(hasuraUrl, {
    query: query,
    variables: variables,
    operationName: operationName
  }, {
    headers: headers
  });

  return response.data.data;
};

module.exports = {
  callHasura
};
