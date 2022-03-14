const express = require("express");
const getAllManagerlocations = require("./get-all-manager-location");
const router = express.Router();

router.get("/get-managers-locations", getAllManagerlocations);

module.exports = router;
