const express = require('express');
const docsRoute = require('./docs.route');
const { registerProviderRoute } = require('./provider.route');
const { registerSearchRoute } = require('./search.route');
const { registerFeedbackRoute } = require('./feedback.route');
const { registerServiceRoute } = require('./service.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/register/provider',
    route: registerProviderRoute,
  },
  {
    path: '/search/service',
    route: registerSearchRoute,
  },
  {
    path: '/register/feedback',
    route: registerFeedbackRoute,
  },
  {
    path: '/on_search/service',
    route: registerServiceRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
