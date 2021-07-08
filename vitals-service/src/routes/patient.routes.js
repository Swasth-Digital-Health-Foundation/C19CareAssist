const patientService = require("../service/patient-service");
const { isEmpty } = require("lodash");
exports.patientAdd = async (req, res) => {
  try {
    let data = await patientService.createPerson(req.body);
      if (isEmpty(data)) return res.status(200).send({ status: "Fail to Add Patient" });
      return res.send({ status: "success" });
  } catch (err) {
    console.log(err)
  }
};

exports.patientSearch = async (req, res) => {
  try {
    if (req.query) {
      let data = await patientService.getPeople(req.query);
      if (isEmpty(data)) return res.status(200).send({ "isRegistered":0});
      return res.send({ "isRegistered": 1});
    }
  } catch (err){
    console.log(err);
  }
};
