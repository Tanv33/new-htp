const express = require("express");
const firePatient = require("./fire-patient");
const getTestedtPatient = require("./get-tested-patient");

const router = express.Router();

router.get("/tested", getTestedtPatient);
router.post("/fire", firePatient);

module.exports = router;
