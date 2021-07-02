const patientService = require("../service/patient-service");
const { isEmpty } = require("lodash");
exports.patientAdd = async (req, res) => {
  try {
    let data = await patientService.createPerson(req.body);
      //TODO : found and Not found Move to config
      let found = "1";
      let notFound = "0";
      if (isEmpty(data)) return res.status(200).send(notFound);
      return res.send(found);
  } catch (err) {

  }
};

exports.patientSearch = async (req, res) => {
  try {
    if (req.query) {
      let data = await patientService.getPeople(req.query);
      //TODO : found and Not found Move to config
      let found = "1";
      let notFound = "0";
      if (isEmpty(data)) return res.status(200).send(notFound);
      return res.send(found);
    }
  } catch (err){
    
  }
};
