const patientService = require("../service/patient-service");
const { isEmpty } = require("lodash");
exports.patientAdd = async (req, res) => {
  try {
    let data = await patientService.createPerson(req.body);
    if (isEmpty(data)) return res.sendStatus(409);
    return res.send(data);
  } catch (err) {

  }
};

exports.patientSearch = async (req, res) => {
  try {
    if (req.query) {
      let data = await patientService.getPeople(req.query);
      if (isEmpty(data)) return res.sendStatus(404);
      return res.send(data);
    }
  } catch (err){
    
  }
};
