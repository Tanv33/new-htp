const express = require("express");
const getPatient = require("./get-patients");
const router = express.Router();

router.get("/get-patients", getPatient);
module.exports = router;
