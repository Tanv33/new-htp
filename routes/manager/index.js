const express = require("express");
const router = express.Router();
const approveEmployee = require("./approve-employee");
const createLocation = require("./create-location");
const searchEmployee = require("./search-employee");
const vendor = require("./vendor");
const patientForm = require("./get-patient-form");

router.use("/location", createLocation);
router.use("/employee", approveEmployee);
router.use("/search-employee", searchEmployee);
router.use("/vendor", vendor);
router.use("/patient", patientForm);

module.exports = router;
