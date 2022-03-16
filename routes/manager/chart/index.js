const express = require("express");
const circularChart = require("./circular-chart");
const employeeChart = require("./employee-chart");
const patientByMonthsChart = require("./patient-by-months-chart");
const router = express.Router();

router.get("/circular", circularChart);
router.get("/employee", employeeChart);
router.get("/patient-by-months", patientByMonthsChart);

module.exports = router;
