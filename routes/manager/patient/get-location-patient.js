const { findOne, find, getPopulatedData } = require("../../../helpers");

const getLocationPatient = async (req, res) => {
  try {
    const manager = await findOne("user", { _id: req.userId });
    const { manager_location } = manager;
    let locationsPatients = await getPopulatedData(
      "patient",
      { location_id: { $in: manager_location } },
      "location_id"
    );
    return res.status(200).send({ status: 200, locationsPatients });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = getLocationPatient;
