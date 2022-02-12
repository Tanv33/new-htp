const { find } = require("../../helpers");

const getPatient = async (req, res) => {
  try {
    let patients = await find("patient", { created_by: req.userId });
    return res.status(200).send({ status: 200, patients });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getPatient;
