const { getPopulatedData, getCount } = require("../../../helpers");

const getAllLocation = async (req, res) => {
  try {
    var allLocations = await getPopulatedData(
      "user",
      { _id: req.userId },
      "type manager_location"
    );
    const { manager_location } = allLocations[0];
    for (let index = 0; index < manager_location.length; index++) {
      let patients = await getCount("patient", {
        location_id: manager_location[index]._id,
      });
      let employees = await getCount("user", {
        employee_location: manager_location[index]._id,
      });
      let no_of_tested = await getCount("patient", {
        location_id: manager_location[index]._id,
        is_tested: "Yes",
      });
      let no_of_not_tested = await getCount("patient", {
        location_id: manager_location[index]._id,
        is_tested: "No",
      });
      manager_location[index].noOfPatient = patients;
      manager_location[index].noOfEmployees = employees;
      manager_location[index].noOfTested = no_of_tested;
      manager_location[index].noOfNotTested = no_of_not_tested;
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
