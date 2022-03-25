const express = require("express");
const basicChart = require("./basic");
const dateChart = require("./date");
const router = express.Router();

router.get("/basic", basicChart);
router.get("/date", dateChart);

module.exports = router;
