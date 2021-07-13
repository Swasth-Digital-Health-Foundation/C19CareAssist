const traigeService = require("../service/triage-service");
const logger = require("../utils/logger");
const { isEmpty } = require("lodash");
exports.triageAdd = async (req, res) => {
  try {
    logger.info(
      `URL Path: ${req.url} \nRequest Body: ${JSON.stringify(req.body)}`
    );
    let data = await traigeService.addTriage(req.body);
    if (isEmpty(data))
      return res.status(200).send({ status: "Fail to Add Triage" });
    return res.send({ status: "success" });
  } catch (err) {
    logger.error(err);
  }
};
