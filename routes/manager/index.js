const express = require("express");
const router = express.Router();
const approveEmployee = require("./approve-employee");
const createLocation = require("./create-location");
const searchEmployee = require("./search-employee");

router.use("/patient", createLocation);
router.use("/employee", approveEmployee);
router.use("/search-employee", searchEmployee);

module.exports = router;
