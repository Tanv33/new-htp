const express = require("express");
const getTestedtPatient = require("./get-tested-patient");

const router = express.Router();

router.get("/tested", getTestedtPatient);

module.exports = router;
