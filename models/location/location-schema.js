const mongoose = require("mongoose");
const schemaType = require("../../types");

const locationSchema = new mongoose.Schema(
  {
    location_name: {
      type: schemaType.TypeString,
      required: true,
    },
    email: {
      type: schemaType.TypeString,
      required: true,
    },
    city: {
      type: schemaType.TypeString,
      required: true,
    },
    state: {
      type: schemaType.TypeString,
      required: true,
    },
    address: {
      type: schemaType.TypeString,
      required: true,
    },
    zip_code: {
      type: schemaType.TypeString,
      required: true,
    },
    test: {
      type: schemaType.TypeArray,
      required: true,
    },
    patient_required_fields: {
      type: schemaType.TypeArray,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = locationSchema;
