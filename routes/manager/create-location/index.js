const express = require("express");
const router = express.Router();
const createLocation = require("./create-location");

router.post("/create-lcoation", createLocation);

module.exports = router;
