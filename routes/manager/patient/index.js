const express = require("express");
const router = express.Router();
const getPatientForm = require("./get-form");
const getLocationPatient = require("./get-location-patient");
const searchPatient = require("./search-patient");

router.get("/get-form", getPatientForm);
router.get("/get-location-patient", getLocationPatient);
router.get("/search-patient", searchPatient);

module.exports = router;
