const express = require("express");
const basicGraph = require("./basic");
const router = express.Router();

router.get("/basic", basicGraph);
module.exports = router;
