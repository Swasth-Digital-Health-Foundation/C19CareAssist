const config = require("./config.json");
const moment = require('moment');
const logger = require("../utils/logger");
const appConfig = require("../env-variables")

/**
 * Patient to set number digits
 * @param {patient_id} 
 * @returns Formated Valide Patient
 */
exports.validatePatient = (patient_id) => {
  return patient_id.length <= 10
    ? patient_id.padStart(10, "0")
    : patient_id.slice(0, 10);
};

/**
 * Format Request body data to spreadsheet data
 * @param {*} data 
 * @returns 
 */
exports.formateData = (data, key) => {
  let finalObject = {};
  let dataArray = [];
  try {
      if (data.table && config.sheetName[data.table.name] === "patients") {
        dataArray[0] = data.event.data.new.patient_id || "N/A";
        dataArray[1] = parseInt(data.event.data.new.age) || "N/A";
        dataArray[2] = data.event.data.new.gender || "N/A";
        dataArray[3] = data.event.data.new.comorbidity || "N/A";
        dataArray[4] =
          moment(data.event.data.new.created_at).format(appConfig.dateFormat) || "N/A";
        dataArray[5] = data.event.data.new.status || "N/A";
      }

      if (data.table && config.sheetName[data.table.name] === "vitals") {
        dataArray[0] = data.event.data.new.patient_id || "N/A";
        dataArray[1] = data.event.data.new.time_report || "N/A";
        dataArray[2] = data.event.data.new.fever || "N/A";
        dataArray[3] = data.event.data.new.tachycardia || "N/A";
        dataArray[4] = data.event.data.new.hypotension || "N/A";
        dataArray[5] = data.event.data.new.breathlessness || "N/A";
        dataArray[6] = data.event.data.new.hypoxia || "N/A";
        dataArray[7] = data.event.data.new.spo2 || "N/A";
        dataArray[8] = data.event.data.new.pronation || "N/A";
        dataArray[9] = data.event.data.new.program || "N/A";
        dataArray[10] = data.event.data.new.added_mobile || "N/A";
      }

      if (data && key === "ivr") {
        dataArray[0] = moment(new Date()).format(appConfig.dateFormat) || "N/A";;
        dataArray[1] = data.numberOfCalls ;
        dataArray[2] = data.numberOfUniqCalls ;
        dataArray[3] = data.numberOfUniqPatients ;
      }
      
    finalObject.sheetName = data.sheetName || config.sheetName[data.table.name];
    finalObject.data = dataArray;

  } catch (err) {
    logger.error(err);
  }
  return finalObject;
};

/**
 * 
 * @param {}  
 * @returns start date and end date with time
 */
exports.dateRange = () => {
  let date = new Date();
  let result = {};
  if (date instanceof Date) {
    result.from = JSON.stringify(new Date(date.setUTCHours(0, 0, 0, 0))).replace("Z","");
    result.to = JSON.stringify(new Date(date.setUTCHours(23, 59, 59, 999))).replace("Z","");
    return result;
  }
}
/**
 * 
 * @param {data,key} 
 * @returns length unique values from array of objects based on key
 */
exports.uniqValues = (data, key) => {
  if (data instanceof Array && key) {
    let result = [...new Set(data.map((item) => item[key]))];
    return result.length > 0 ? result.length : 0;
  }
}