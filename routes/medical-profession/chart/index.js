const express = require("express");
const circularChart = require("./circular-chart");
const patientByMonthsChart = require("./patient-by-months-chart");
const router = express.Router();

router.get("/circular-chart", circularChart);
router.get("/patient-by-months", patientByMonthsChart);
module.exports = router;
