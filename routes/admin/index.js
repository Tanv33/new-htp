const express = require("express");
const router = express.Router();
const approveManager = require("./approve-manager");
const searchManager = require("./search-manager");
const manager = require("./manager");

router.use("/manager", approveManager);
router.use("/search-manager", searchManager);
router.use("/manager", manager);

module.exports = router;
