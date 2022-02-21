const express = require("express");
const getLocation = require("./get-location");
const router = express.Router();

router.get("/get-location", getLocation);

module.exports = router;
