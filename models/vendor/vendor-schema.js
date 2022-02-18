const mongoose = require("mongoose");
const schemaType = require("../../types");

const userTypeSchema = new mongoose.Schema(
  {
    name: {
      type: schemaType.TypeString,
      required: true,
    },
    email: {
      type: schemaType.TypeString,
      unique: true,
      required: true,
    },
    password: {
      type: schemaType.TypeString,
      required: true,
    },
    locations: {
      type: schemaType.TypeObjectId,
      ref: "location",
      requried: true,
    },
    created_date: {
      type: schemaType.TypeDate,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = userTypeSchema;
