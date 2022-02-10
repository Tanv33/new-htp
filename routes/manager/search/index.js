const express = require("express");
const router = express.Router();
const simpleQuery = require("./simple-query");

router.get("/simple-query", simpleQuery);

module.exports = router;
