const { findOne, insertNewDocument } = require("../../../helpers");
var SongSchema = require("mongoose").model("patient").schema;

const getPatientForm = async (req, res) => {
  try {
    return res.status(200).send({ status: 200, user: new_user });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = getPatientForm;
