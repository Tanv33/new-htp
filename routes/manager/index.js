const express = require("express");
const router = express.Router();
const approveEmployee = require("./approve-employee");
const createLocation = require("./create-location");
const search = require("./search");

router.use("/patient", createLocation);
router.use("/employee", approveEmployee);
router.use("/search", search);

module.exports = router;
