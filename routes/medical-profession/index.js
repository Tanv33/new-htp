const express = require("express");
const router = express.Router();
const patient = require("./patient");
const chart = require("./chart");

router.use("/patient", patient);
router.use("/chart", chart);
// router.use("/chart");

module.exports = router;
