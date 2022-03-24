const express = require("express");
const router = express.Router();
const patient = require("./patient");
const chart = require("./chart");
const ltPatient = require("./lt-patient");

router.use("/patient", patient);
router.use("/chart", chart);
router.use("/lt-patient", ltPatient);

module.exports = router;
