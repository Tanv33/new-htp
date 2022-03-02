const express = require("express");
const router = express.Router();
const patient = require("./patient");
const csv = require("./csv");
const location = require("./location");

router.use("/patient", patient);
router.use("/csv", csv);
router.use("/location", location);

module.exports = router;
