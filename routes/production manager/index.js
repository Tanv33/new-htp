const express = require("express");
const router = express.Router();
const patient = require("./patient");
const location = require("./location");

router.use("/patient", patient);
router.use("/location", location);

module.exports = router;
