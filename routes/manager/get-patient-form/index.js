const express = require("express");
const router = express.Router();
const getPatientForm = require("./get-form");

router.get("/get-form", getPatientForm);

module.exports = router;
