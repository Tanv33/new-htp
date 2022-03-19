const express = require("express");
const getPatient = require("./get-patients");
const searchPatient = require("./search-patient");
const router = express.Router();

router.get("/get-patients", getPatient);
router.get("/search-patient", searchPatient);
module.exports = router;
