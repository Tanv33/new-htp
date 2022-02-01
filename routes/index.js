const express = require("express");
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
const router = express.Router();

// AUTH Routes * /api/auth/*
router.use("/auth", auth);
router.use("/user", tokenVerification, user_Type);
router.use("/test", tokenVerification, test_Type);
router.use("/patient", tokenVerification, mpVerification, patient);
router.use("/admin", tokenVerification, adminVerification, admin);
router.use("/manager", tokenVerification, managerVerification, manager);
// managerVerification

module.exports = router;
