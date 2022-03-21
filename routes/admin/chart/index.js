const express = require("express");
const basicChart = require("./basic");
const router = express.Router();

router.get("/basic", basicChart);
router.get("/search-patient");
module.exports = router;
