const express = require('express');
const { o2ServiceTrigger, o2RequirementTrigger } = require('../../controllers/event.trigger.controller');

const o2RequirementRoute = express.Router();
o2RequirementRoute
.route('/').post(o2RequirementTrigger)

const o2ServiceRoute = express.Router();
o2ServiceRoute
.route('/').post(o2ServiceTrigger);

module.exports = {
  o2RequirementRoute,
  o2ServiceRoute,
};
