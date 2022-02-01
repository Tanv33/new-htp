const { tokenVerification } = require("./token-verification");
const { mpVerification } = require("./medical-profession-verification");
const { adminVerification } = require("./admin-verification");
const { managerVerification } = require("./manager-verification");

module.exports = {
  tokenVerification,
  mpVerification,
  adminVerification,
  managerVerification,
};
