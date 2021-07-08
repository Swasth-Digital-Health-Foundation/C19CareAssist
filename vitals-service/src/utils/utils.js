const config = require("./config.json");
const moment = require('moment');

/**
 * Patient to set number digits
 * @param {*} patient_id
 * @returns
 */
exports.validatePatient = (patient_id) => {
  return patient_id.length <= 10
    ? patient_id.padStart(10, "0")
    : patient_id.slice(0, 10);
};

/**
 * Format Request body data to spreadsheet data
 * @param {*} params 
 * @returns 
 */
exports.formateData = (params) => {
  let finalObject = {};
  let dataArray = [];
  try {
      if (config.sheetName[params.table.name] === "patients") {
        dataArray[0] = params.event.data.new.patient_id || "N/A";
        dataArray[1] = params.event.data.new.age || "N/A";
        dataArray[2] = params.event.data.new.gender || "N/A";
        dataArray[3] = params.event.data.new.comorbidity || "N/A";
        dataArray[4] =
          moment(params.event.data.new.created_at).format("DD/MM/YYYY") ||
          "N/A";
        dataArray[5] = params.event.data.new.status || "N/A";
      }

      if (config.sheetName[params.table.name] === "vitals") {
        dataArray[0] = params.event.data.new.patient_id || "N/A";
        dataArray[1] = params.event.data.new.time_report || "N/A";
        dataArray[2] = params.event.data.new.fever || "N/A";
        dataArray[3] = params.event.data.new.tachycardia || "N/A";
        dataArray[4] = params.event.data.new.hypotension || "N/A";
        dataArray[5] = params.event.data.new.breathlessnes || "N/A";
        dataArray[6] = params.event.data.new.hypoxia || "N/A";
        dataArray[7] = params.event.data.new.spo2 || "N/A";
        dataArray[8] = params.event.data.new.pronation || "N/A";
        dataArray[9] = params.event.data.new.program || "N/A";
        dataArray[10] = params.event.data.new.added_mobile || "N/A";
      }
      
    finalObject.sheetName = config.sheetName[params.table.name];
    finalObject.data = dataArray;

  } catch (err) {
    console.log(err)
  }
  return finalObject;
};
