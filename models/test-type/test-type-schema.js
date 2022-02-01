const mongoose = require("mongoose");
const schemaType = require("../../types");

const testTypeSchema = new mongoose.Schema(
  {
    type: {
      type: schemaType.TypeString,
      unique: true,
      required: true,
    },
    status: {
      type: schemaType.TypeString,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = testTypeSchema;
