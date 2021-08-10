const logger = require("../utils/logger");
const moment = require("moment");
const utils = require("../utils/utils");
const axios = require("axios");
const appConfigs = require("../env-variables");
const patientData = require("./patient-service");
const googleService = require("../service/googleSheet-service");
class ivrManager {
  async main() {
    let date = moment(new Date()).format(appConfigs.dateFormat);
    let result = {}
    try {
      const response = await axios.get(
      `${appConfigs.ivrUrl}?method=dial&format=json&api_key=${appConfigs.ivrApiKey}&fromdate=${date}&todate=${date}`
    );
      logger.info(`Calling IVR Api:${appConfigs.ivrUrl}`);
      let callData               =  response.data.data;
      result.numberOfCalls       =  callData.length > 0 ? callData.length : 0;
      result.numberOfUniqCalls = utils.uniqValues(callData, "callfrom");
      result.numberOfUniqPatients = utils.uniqValues(
        await patientData.geUniqtPatients(),
        "patient_id"
      );
      result.sheetName          = "ivr_data";

      let formateData           = utils.formateData(result, "ivr");
      formateData.spreadsheetId = appConfigs.googleService.ivr_spreadsheetId;

      let data = await googleService.saveDataToSheet(formateData);

      return data;
    } catch (err){
      logger.error(err);
    }
  };
}

module.exports = new ivrManager();
