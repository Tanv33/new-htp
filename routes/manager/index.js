const express = require("express");
const router = express.Router();
const approveEmployee = require("./approve-employee");
const location = require("./location");
const searchEmployee = require("./search-employee");
const vendor = require("./vendor");
const patientForm = require("./patient");

router.use("/location", location);
router.use("/employee", approveEmployee);
router.use("/search-employee", searchEmployee);
router.use("/vendor", vendor);
router.use("/patient", patientForm);

module.exports = router;
