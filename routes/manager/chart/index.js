const express = require("express");
const circularChart = require("./circular-chart");
const employeeChart = require("./employee-chart");
const router = express.Router();

router.get("/circular", circularChart);
router.get("/employee", employeeChart);

module.exports = router;
