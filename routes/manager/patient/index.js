const express = require("express");
const router = express.Router();
const getPatientForm = require("./get-form");
const getLocationPatient = require("./get-location-patient");

router.get("/get-form", getPatientForm);
router.get("/get-location-patient", getLocationPatient);

module.exports = router;
