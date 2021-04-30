const axios = require('axios');
const appConfigs = require('./config');

const instance = axios.create({
  baseURL: appConfigs.hasuraUrl,
});
instance.defaults.headers.common['x-hasura-admin-secret'] = appConfigs.hasuraAdminSecret;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

module.exports = instance;