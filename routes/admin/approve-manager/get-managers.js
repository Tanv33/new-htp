const { findOne, find, getPopulatedData } = require("../../../helpers");

const getManagers = async (req, res) => {
  try {
    const findManagerId = await findOne("userType", { type: "Manager" });
    const { _id } = findManagerId;
    const managersArray = await getPopulatedData(
      "user",
      {
        type: _id,
      },
      "type manager_location"
    );
    return res.status(200).send({ status: 200, managersArray });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getManagers;
