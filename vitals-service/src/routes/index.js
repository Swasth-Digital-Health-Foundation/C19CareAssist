const express = require("express"),
  router = express.Router(),
  config = require("../env-variables");
const { patientAdd, patientSearch } = require("../routes/patient.routes");
const { vitalAdd } = require("../routes/vitals.routes");
const { triageAdd } = require("../routes/triage.routes");

router.post("/patients/create", patientAdd);

router.get("/patients/search", patientSearch);

router.post("/patients/vital/add", vitalAdd);

router.post("/patients/triage/add", triageAdd);

// TODO 
router.post("/vital/update", async (req, res) => {});

router.post("/trigger/patient", async (req, res) => {
  console.log(JSON.stringify(req.body));
  return res.send({ status: "success" });
});


router.post("/trigger/vital", async (req, res) => {
  console.log(JSON.stringify(req.body));
  return res.send({ status: "success" });
});

router.get("/health", (req, res) => res.sendStatus(200));

module.exports = router;
