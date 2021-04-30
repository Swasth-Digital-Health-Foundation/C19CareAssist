const axios = require('axios');

const hasuraAdminSecret = process.env.HASURA_ADMIN_SECRET;
const hasuraUrl = process.env.HASURA_URL;

const callHasura = async (query, variables, operationName) => {
  
};

module.exports = {
  callHasura
};
