const express = require("express");
const router = express.Router();
const basicGraph = require("./basic");
const patientByMonth = require("./patient-by-month");

router.get("/basic", basicGraph);
router.get("/patient-by-month", patientByMonth);
module.exports = router;
