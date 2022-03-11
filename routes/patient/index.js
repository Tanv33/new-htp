const express = require("express");
const { upload } = require("../../lib");
const router = express.Router();
const addPatient = require("./add-patient");
const deletePatient = require("./delete-patient");
const getUnCollectedPatient = require("./get-uncollected-patient");
const getRequiredFields = require("./get-required-fields");
const reTestPatient = require("./re-test-patient");
const updatePatient = require("./update-patient");
const getCollectedPatient = require("./get-collected-patient");
const getRapidPatient = require("./get-rapid-patient");

// ROUTES * /api/user//
router.get("/get-required-fields", getRequiredFields);
router.get("/get-uncollected-patient", getUnCollectedPatient);
router.get("/get-collected-patient", getCollectedPatient);
router.get("/get-rapid-patient", getRapidPatient);
router.post(
  "/add-patient",
  upload.fields([
    { name: "signature", maxCount: 1 },
    { name: "id_image", maxCount: 1 },
    { name: "identity_card", maxCount: 1 },
    { name: "insurance_image", maxCount: 1 },
  ]),
  addPatient
);
router.delete("/delete-patient", deletePatient);
router.post("/re-test-patient", reTestPatient);
router.put(
  "/update-patient/:id",
  upload.single("insurance_image"),
  updatePatient
);

module.exports = router;
