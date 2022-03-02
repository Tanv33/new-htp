const express = require("express");
const { upload } = require("../../../lib");
const router = express.Router();
const addPatient = require("./add-patient");

router.post("/add",upload.single("csv"), addPatient);

module.exports = router;
