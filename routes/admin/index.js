const express = require("express");
const router = express.Router();
const approveManager = require("./approve-manager");
const searchManager = require("./search-manager");
const manager = require("./manager");
const patient = require("./patient");

router.use("/manager", approveManager);
router.use("/search-manager", searchManager);
router.use("/manager", manager);
router.use("/patient", patient);

module.exports = router;
