const patientService = require("../service/patient-service");

exports.patientAdd = async (req, res) => {
  try {
    let data = await patientService.createPerson(req.body);
    if (data === (undefined || null)) return;
    return res.send(data);
  } catch {

  }
};

exports.patientSearch = async (req, res) => {
  try {
    if (req.query) {
      let data = await patientService.getPeople(req.query);
      if (data === (undefined || null)) return;
      return res.send(data);
    }
  } catch {

  }
};

