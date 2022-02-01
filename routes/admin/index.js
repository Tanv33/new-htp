const express = require("express");
const router = express.Router();
const approveManager = require("./approve-manager");

router.use("/manager", approveManager);

module.exports = router;
