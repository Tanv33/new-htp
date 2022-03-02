const express = require("express");
const { upload } = require("../../../lib");
const router = express.Router();
const addPatient = require("./add-patient");

router.post("/add-patient",upload.single("csv"), addPatient);

module.exports = router;
