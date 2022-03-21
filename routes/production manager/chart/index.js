const express = require("express");
const router = express.Router();
const basicChart = require("./basic");
const getAllLocation = require("./get-all-location");
const patientByMonthsChart = require("./patient-by-month");

router.get("/basic", basicChart);
router.get("/patient-by-month", patientByMonthsChart);
router.get("/get-all-location", getAllLocation);
module.exports = router;
