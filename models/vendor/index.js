const mongoose = require("mongoose");
const vendorSchema = require("./vendor-schema");

const vendor = mongoose.model("vendors", vendorSchema);

module.exports = vendor;
