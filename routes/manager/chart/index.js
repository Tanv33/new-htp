const express = require("express");
const charts = require("./charts");
const patientByMonthsChart = require("./patient-by-months-chart");
const router = express.Router();

router.get("/patient-by-months", patientByMonthsChart);
router.get("/basic", charts);

module.exports = router;
