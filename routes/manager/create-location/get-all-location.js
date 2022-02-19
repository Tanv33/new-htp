const { getPopulatedData, find } = require("../../../helpers");

const getAllLocation = async (req, res) => {
  try {
    const allLocations = await getPopulatedData(
      "user",
      { _id: req.userId },
      "type manager_location"
    );
    let noOfPatient = [];
    const { manager_location } = allLocations[0];
    for (let index = 0; index < manager_location.length; index++) {
      let patients = await find("patient", {
        location_id: manager_location[index]._id,
      });
      noOfPatient.push(patients.length);
    }
    // manager_location.map((object, i) => {
    //   let patients = await find("patient", {
    //     location_id: object._id,
    //   });
    //   manager_location[i].noOfPatient = patients.length;
    // });
    return res
      .status(200)
      .send({ status: 200, allLocations: manager_location, noOfPatient });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getAllLocation;
