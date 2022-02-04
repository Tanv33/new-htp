const { findOne, find } = require("../../../helpers");
const { ObjectID } = require("../../../types");

const getManagers = async (req, res) => {
  try {
    const findManagerId = await findOne("userType", { type: "Manager" });
    const { _id } = findManagerId;
    const managersArray = await find("user", {
      type: _id,
    });
    return res.status(200).send({ status: 200, managersArray });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getManagers;
