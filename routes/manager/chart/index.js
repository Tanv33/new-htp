const express = require("express");
const circularChart = require("./circular-chart");
const router = express.Router();

router.get("/circular", circularChart);

module.exports = router;
