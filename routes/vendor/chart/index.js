const express = require("express");
const router = express.Router();
const circularChart = require("./circular");
const patientByMonthsChart = require("./patient-by-month");

router.get("/circular", circularChart);
router.get("/patient-by-month", patientByMonthsChart);
module.exports = router;
