const express = require("express");
const basicChart = require("./basic");
const patientByMonthsChart = require("./patient-by-month");
const router = express.Router();

router.get("/basic", basicChart);
router.get("/patient-by-month", patientByMonthsChart);
module.exports = router;
