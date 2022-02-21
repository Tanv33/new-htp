const { getPopulatedData, find } = require("../../../helpers");

const getAllLocation = async (req, res) => {
  try {
    var allLocations = await getPopulatedData(
      "user",
      { _id: req.userId },
      "type manager_location"
    );
    const { manager_location } = allLocations[0];
    for (let index = 0; index < manager_location.length; index++) {
      let patients = await find("patient", {
        location_id: manager_location[index]._id,
      });
      manager_location[index].noOfPatient = patients.length;
    }
    return res
      .status(200)
      .send({ status: 200, allLocations: manager_location });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getAllLocation;
