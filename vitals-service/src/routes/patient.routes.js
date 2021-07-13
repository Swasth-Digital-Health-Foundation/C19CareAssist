const patientService = require("../service/patient-service");
const logger = require("../utils/logger");
const { isEmpty } = require("lodash");
exports.patientAdd = async (req, res) => {
  try {
    logger.info(
      `URL Path: ${req.url} \nRequest Body: ${JSON.stringify(req.body)}`
    );
    let data = await patientService.createPerson(req.body);
    if (isEmpty(data)) return res.status(200).send({ status: "Fail to Add Patient" });
    return res.send({ status: "success" });
  } catch (err) {
    logger.error(err);
  }
};

exports.patientSearch = async (req, res) => {
  try {
    logger.info(`URL Path: ${req.url} \nRequest Query: ${JSON.stringify(req.query)}`);
    if (!isEmpty(req.query)) {
      let data = await patientService.getPeople(req.query);
      if (isEmpty(data)) return res.status(200).send({ "isRegistered":0});
      return res.send({ "isRegistered": 1});
    }
    return res.send("No Params Found!")
  } catch (err){
    logger.error(err);
  }
};
