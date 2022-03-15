const express = require("express");
const getAllLocationPatients = require("./get-all-location-patients");
const router = express.Router();

router.get("/get-all-location-patients", getAllLocationPatients);

module.exports = router;
