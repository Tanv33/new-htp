const express = require("express");
const router = express.Router();
const {
  tokenVerification,
  mpVerification,
  adminVerification,
  managerVerification,
} = require("../middleware");
const auth = require("./auth");
const user_Type = require("./user-type");
const test_Type = require("./test-type");
const admin = require("./admin");
const patient = require("./patient");
const manager = require("./manager");
const { upload } = require("../lib");

// AUTH Routes * /api/auth/*
router.use("/auth", auth);
router.use("/user", tokenVerification, user_Type);
router.use("/test", tokenVerification, test_Type);
router.use("/patient", tokenVerification, mpVerification, patient);
router.use("/admin", tokenVerification, adminVerification, admin);
router.use("/manager", tokenVerification, managerVerification, manager);
router.post("/rough", upload.single("logo"), (req, res) => {
  console.log(req.body);
  return res.status(200).send(req.body);
});

module.exports = router;
