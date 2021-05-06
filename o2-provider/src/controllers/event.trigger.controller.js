const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {processO2Requirement, processO2Service} = require('../match/o2-requirement-processor')

const o2RequirementTrigger = catchAsync(async (req, res) => {
  await processO2Requirement(req.body.event.data.new)
  // {"pin_code":"560102","uuid":"c2093125-1248-43a5-997f-71c1e22dc7b3","active":true,"city":null,"created_at":"2021-05-05T16:49:08.897133+00:00","id":7,"address_detail":null,"type":"TYPE_B","user_id":"9aa7438f-52ff-4d4d-ad6b-b1a8e9c1d507"}  

  res.status(httpStatus.OK).send();
});

const o2ServiceTrigger = catchAsync(async (req, res) => {
  await processO2Service(req.body.event.data.new)
  // {"pin_code":"560102","uuid":"c2093125-1248-43a5-997f-71c1e22dc7b3","active":true,"city":null,"created_at":"2021-05-05T16:49:08.897133+00:00","id":7,"address_detail":null,"type":"TYPE_B","user_id":"9aa7438f-52ff-4d4d-ad6b-b1a8e9c1d507"}

  res.status(httpStatus.OK).send();
});

module.exports = {
  o2RequirementTrigger,
  o2ServiceTrigger,
};
