const express = require("express");
const router = express.Router();
const signUp = require("./signup");
const loginUser = require("./login");
const forgetPassword = require("./forgot-password");
const checkPassword = require("./check-password");
const { upload } = require("../../lib");
// const checkPassword = require("./check-password");
// const { tokenVerification } = require("../../middleware");

// ROUTES * /api/auth/
router.post("/register", upload.single("manager_logo"), signUp);
router.post("/login", loginUser);
router.post("/forgetpassword", forgetPassword);
router.post("/checkpassword", checkPassword);
// router.post("/", checkPassword);

module.exports = router;
