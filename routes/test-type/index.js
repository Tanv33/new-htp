const express = require("express");
const router = express.Router();
const addTestType = require("./add-test-type");
const deleteTestType = require("./delete-test-type");
const getTestType = require("./get-test-type");
const updateTestType = require("./update-test-type");

// ROUTES * /api/user//
router.get("/get-test-types", getTestType);
router.post("/add-test-type", addTestType);
router.delete("/delete-test-type", deleteTestType);
router.put("/update-test-type/:id", updateTestType);

module.exports = router;
