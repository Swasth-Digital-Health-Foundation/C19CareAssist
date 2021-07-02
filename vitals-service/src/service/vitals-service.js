const fetch = require("node-fetch");
const config = require('../env-variables');
const dtmfConfig = require('../utils/config.json');
const utils = require("../utils/utils");

class VitalsService {
  async addVitals(vitals) {
    let patient_id = utils.validatePatient(vitals.patient_id);
    var query = `
    mutation insert_vitals($object: c19_vitals_insert_input!) {
      insert_c19_vitals_one(object: $object) {
        uuid
      }
    }       
    `;
    var options = {
      method: "POST",
      body: JSON.stringify({
        query: query,
        variables: {
          object: {
            patient_id: patient_id,
            fever: dtmfConfig.dtmf[vitals.fever],
            tachycardia: dtmfConfig.dtmf[vitals.tachycardia],
            hypotension: dtmfConfig.dtmf[vitals.hypotension],
            breathlessnes: dtmfConfig.dtmf[vitals.breathlessnes],
            hypoxia: dtmfConfig.dtmf[vitals.hypoxia],
            spo2: dtmfConfig.spo2[vitals.spo2]
              ? dtmfConfig.spo2[vitals.spo2]
              : "",
            pronation: dtmfConfig.dtmf[vitals.pronation]
              ? dtmfConfig.dtmf[vitals.pronation]
              : "",
            program: dtmfConfig.program[vitals.program],
            added_mobile: vitals.added_mobile,
            time_report: dtmfConfig.time_report[vitals.time_report],
          },
        },
        operationName: "insert_vitals",
      }),
      headers: {
        "x-hasura-admin-secret": config.hasuraAdminSecret,
      },
    };

    let response = await fetch(config.hasuraUrl, options);
    let data = await response.json();
    return data.data.insert_c19_vitals_one.uuid;
  }

  validatePatient(num) {
    return num.length <= 10 ? num.padStart(10, "0") : num.slice(0, 10);
  }
}

module.exports = new VitalsService();