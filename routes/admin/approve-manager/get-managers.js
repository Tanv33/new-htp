const { getPopulatedData } = require("../../../helpers");

const getManagers = async (req, res) => {
  try {
    const getManagerArray = await getPopulatedData(
      "user",
      {},
      "type",
      "type status"
    );
    const managersArray = getManagerArray.filter(
      (element) => element.type.type === "Manager"
    );
    return res.status(200).send({ status: 200, managersArray });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getManagers;
