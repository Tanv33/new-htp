const express = require("express");
const router = express.Router();
const getEmployeesByLabName = require("./search-by-lab-name");

router.get("/employee-by-lab-name", getEmployeesByLabName);

module.exports = router;
