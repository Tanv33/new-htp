const express = require("express");
const { upload } = require("../../../lib");
const router = express.Router();
const createLocation = require("./create-location");
const getAllLocation = require("./get-all-location");

router.post("/create", upload.single("location_logo"), createLocation);
router.get("/get-all-location", getAllLocation);

module.exports = router;
