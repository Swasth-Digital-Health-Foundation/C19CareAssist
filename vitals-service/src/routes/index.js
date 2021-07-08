const express = require("express"),
  router = express.Router(),
  config = require("../env-variables");
const { patientAdd, patientSearch } = require("../routes/patient.routes");
const { vitalAdd } = require("../routes/vitals.routes");
const { triageAdd } = require("../routes/triage.routes");
const { triggerPatient, triggerVitals } = require("../routes/event.trigger");


router.post("/patients/create", patientAdd);

router.get("/patients/search", patientSearch);

router.post("/patients/vital/add", vitalAdd);

router.post("/patients/triage/add", triageAdd);

router.post("/trigger/patient", triggerPatient);

router.post("/trigger/vital", triggerVitals);

// TODO 
router.post("/vital/update", async (req, res) => {});

router.get("/health", (req, res) => res.sendStatus(200));

module.exports = router;
