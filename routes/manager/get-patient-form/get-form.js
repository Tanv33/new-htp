const { findOne, insertNewDocument } = require("../../../helpers");
var patientSchema = require("mongoose").model("patient");

const getPatientForm = async (req, res) => {
  try {
    const patientForm = patientSchema.schema.obj;
    return res.status(200).send({ status: 200, patientForm });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = getPatientForm;
