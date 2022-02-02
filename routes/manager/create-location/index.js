const express = require("express");
const router = express.Router();
const createLocation = require("./create-location");
const getAllLocation = require("./get-all-location");

router.post("/create-location", createLocation);
router.get("/get-all-location", getAllLocation);

module.exports = router;
