const express = require("express");
const router = express.Router();
const patient = require("./patient");

router.use("/patient", patient);

module.exports = router;
