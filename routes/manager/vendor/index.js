const express = require("express");
const router = express.Router();
const createVendor = require("./create-vendor");

router.post("/create", createVendor);

module.exports = router;
