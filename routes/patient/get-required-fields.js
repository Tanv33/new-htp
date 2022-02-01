const { findOne, getPopulatedData } = require("../../helpers");

const getRequiredFields = async (req, res) => {
  try {
    const medicalProfession = await findOne("user", { _id: req.userId });
    const allUsers = await getPopulatedData(
      "user",
      { mid: medicalProfession.mid },
      "type",
      "type"
    );
    const manager = allUsers.filter((user) => user.type.type === "Manager");
    if (!manager.length) {
      return res
        .status(400)
        .send({ status: 400, message: "No Manager Found with your mid" });
    }
    if (!manager[0].lab_required_fields.length) {
      return res
        .status(400)
        .send({ status: 400, message: "No Lab Created by your Manager" });
    }
    return res.status(200).send({
      status: 200,
      lab_required_fields: manager[0].lab_required_fields,
    });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getRequiredFields;
