const { findOne, find, getPopulatedData } = require("../../../helpers");

const getAllManagerlocations = async (req, res) => {
  try {
    // const findManagerId = await findOne("userType", { type: "Manager" });
    // const { _id } = findManagerId;
    // const managersArray = await getPopulatedData("location", {}, "created_by");
    // return res.status(200).send({ status: 200, managersArray });
    return res.status(200).send({ status: 200, message: "Api is in progress" });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getAllManagerlocations;
