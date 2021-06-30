const fetch = require("node-fetch");
const config = require('../env-variables');

class VitalsService {
  async addVitals(vitals) {
    var query = `
    mutation insert_vitals($object: c19_vitals_insert_input!) {
      insert_c19_vitals_one(object: $object) {
        uuid
      }
    }       
    `
    var options = {
      method: "POST",
      body: JSON.stringify({
        query: query,
        variables: {
          object: {
            patient_id: vitals.patient_id,
            fever: vitals.fever,
            tachycardia: vitals.tachycardia,
            hypotension: vitals.hypotension,
            breathelessnes: vitals.breathelessnes,
            hypoxia: vitals.hypoxia,
            spo2: vitals.spo2,
            pronation: vitals.pronation,
            program: vitals.program,
            added_mobile: vitals.added_mobile
          },
        },
        operationName: "insert_vitals",
      }),
      headers: {
        "x-hasura-admin-secret": config.hasuraAdminSecret,
      },
    };

    let response = await fetch(config.hasuraUrl, options);
    let data = await response.json()
    return data.data.insert_c19_vitals_one.uuid;
  }
}

module.exports = new VitalsService();