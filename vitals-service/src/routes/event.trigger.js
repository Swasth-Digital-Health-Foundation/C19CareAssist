const googleService = require("../service/googleSheet-service");
const utils = require("../utils/utils");
const { isEmpty } = require("lodash");
const logger = require("../utils/logger");
exports.triggerPatient = async (req, res) => {
  try {
    logger.info(
      `URL Path: ${req.url} \nRequest Body: ${JSON.stringify(req.body)}`
    );
    let formateData = utils.formateData(req.body);
    let data = await googleService.saveDataToSheet(formateData);
    if (isEmpty(data))
      return res.status(200).send({ status: "Fail to Add Patient in Sheet" });
    return res.send({ status: "success" });
  } catch (err) {
    logger.error(err);
  }
};


exports.triggerVitals = async (req, res) => {
  try {
    logger.info(
      `URL Path: ${req.url} \nRequest Body: ${JSON.stringify(req.body)}`
    );
    let formateData = utils.formateData(req.body);
    let data = await googleService.saveDataToSheet(formateData);
    if (isEmpty(data))
      return res.status(200).send({ status: "Fail to Add Vitals in Sheet" });
    return res.send({ status: "success" });
  } catch (err) {
    logger.error(err);
  }
};