const express = require("express");
const router = express.Router();
const approveEmployee = require("./approve-employee");
const createLocation = require("./create-location");
const searchEmployee = require("./search-employee");
const vendorOperation = require("./vendor");

router.use("/patient", createLocation);
router.use("/employee", approveEmployee);
router.use("/search-employee", searchEmployee);
router.use("/vendor", vendorOperation);

module.exports = router;
