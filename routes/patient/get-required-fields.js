const { getPopulatedData } = require("../../helpers");

const getRequiredFields = async (req, res) => {
  try {
    // const medicalProfession = await findOne("user", { _id: req.userId });
    const medicalProfession = await getPopulatedData(
      "user",
      { _id: req.userId },
      "type employee_location"
    );
    const { employee_location } = medicalProfession[0];
    return res.status(200).send({
      status: 200,
      employee_location,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getRequiredFields;
