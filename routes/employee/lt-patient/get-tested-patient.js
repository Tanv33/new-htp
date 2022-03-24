const { findOne, find } = require("../../../helpers");

const getTestedtPatient = async (req, res) => {
  try {
    const user = await findOne("user", { _id: req.userId });
    const { employee_location } = user;
    const patients = await find("patient", {
      location_id: employee_location,
      is_tested: "Yes",
      "test_type.type": { $ne: "Rapid" },
    });
    return res.status(200).send({ status: 200, patients });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = getTestedtPatient;
