const express = require("express");
const router = express.Router();
const approveEmployee = require("./approve-employee");
const createLocation = require("./create-location");

router.use("/patient", createLocation);
router.use("/employee", approveEmployee);

module.exports = router;
