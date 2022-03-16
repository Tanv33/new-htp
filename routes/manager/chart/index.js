const express = require("express");
const circularChart = require("./circular-chart");
const employeeChart = require("./employee-chart");
const patientByMonthsChart = require("./patient-by-months-chart");
const testTypesChart = require("./test-type-chart");
const router = express.Router();

router.get("/circular", circularChart);
router.get("/employee", employeeChart);
router.get("/patient-by-months", patientByMonthsChart);
router.get("/test-type-chart", testTypesChart);

module.exports = router;
