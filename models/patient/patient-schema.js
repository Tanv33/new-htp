const mongoose = require("mongoose");
const schemaType = require("../../types");

const patientSchema = new mongoose.Schema(
  {
    first_name: {
      type: schemaType.TypeString,
      required: true,
    },
    last_name: {
      type: schemaType.TypeString,
      required: true,
    },
    full_name: {
      type: schemaType.TypeString,
      required: true,
    },
    email: {
      type: schemaType.TypeString,
      // unique: true,
      required: true,
    },
    delivery_method: {
      type: schemaType.TypeArray,
      //   required: true,
    },
    is_tested: {
      type: schemaType.TypeString,
      default: "No",
    },
    is_insured: {
      type: schemaType.TypeBoolean,
      default: false,
    },
    telephone: {
      type: schemaType.TypeString,
      // unique: true,
      required: true,
    },
    address: {
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
    zip_code: {
      type: schemaType.TypeString,
      required: true,
    },
    date_of_birth: {
      type: schemaType.TypeDate,
      required: true,
    },
    age: {
      type: schemaType.TypeNumber,
      required: true,
    },
    created_by: {
      type: schemaType.ObjectID,
      ref: "user",
      requried: true,
    },
    location: {
      type: schemaType.ObjectID,
      ref: "location",
      // requried: true,
    },
    signature: {
      type: schemaType.TypeString,
      // PDF File
      // required: true,
    },
    consent_link: {
      type: schemaType.TypeString,
      // PDF File
      // required: true,
    },
    doc_prescription: {
      type: schemaType.TypeBoolean,
      default: false,
    },
    doc_prescription_url: {
      type: schemaType.TypeString,
      //   required: true,
    },
    test_type: {
      type: schemaType.ObjectID,
      ref: "test-types",
      required: true,
    },
    pid: {
      type: schemaType.TypeNumber,
      unique: true,
      required: true,
    },
    pid_link: {
      type: schemaType.TypeString,
      required: true,
    },
    sex: {
      type: schemaType.TypeString,
      required: true,
    },
    passport: {
      type: schemaType.TypeBoolean,
      // default: false,
    },
    created_date: {
      type: schemaType.TypeDate,
      default: Date.now,
    },
    covid_test_form: {
      type: schemaType.TypeString,
      // PDF File
      // required: true,
    },
    id_image: {
      type: schemaType.TypeString,
      // required: true,
    },
    identity_card: {
      type: schemaType.TypeString,
      // required: true,
    },
    insurance_image: {
      type: schemaType.TypeString,
      // required: true,
    },
    patient_test_result_sign_off: {
      type: schemaType.TypeString,
      // PDF File
      // required: true,
    },
    tested_by: {
      type: schemaType.ObjectID,
      ref: "user",
      required: true,
    },
    tested_date: {
      type: schemaType.TypeDate,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = patientSchema;
