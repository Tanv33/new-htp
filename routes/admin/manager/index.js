const express = require("express");
const getAllManagerlocations = require("./get-all-manager-location");
const getManagersName = require("./get-managers-name");
const router = express.Router();

router.get("/get-managers-locations", getAllManagerlocations);
router.get("/name", getManagersName);

module.exports = router;
