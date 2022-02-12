const express = require("express");
const router = express.Router();
const approveManager = require("./approve-manager");
const searchManager = require("./search-manager");

router.use("/manager", approveManager);
router.use("/search-manager", searchManager);

module.exports = router;
