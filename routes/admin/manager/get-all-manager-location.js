const {
  findOne,
  find,
  getPopulatedData,
  getCount,
} = require("../../../helpers");

const getAllManagerlocations = async (req, res) => {
  try {
    // const findManagerId = await findOne("userType", { type: "Manager" });
    // const { _id } = findManagerId;
    // const managersArray = await getPopulatedData("location", {}, "created_by");
    // return res.status(200).send({ status: 200, managersArray });
    // return res.status(200).send({ status: 200, message: "Api is in progress" });
    const findManagerId = await findOne("userType", { type: "Manager" });
    // const allManagers = await find("user", { type: findManagerId });
    const allManagers = await getPopulatedData(
      "user",
      { type: findManagerId._id },
      "manager_location"
    );
    for (let i = 0; i < allManagers.length; i++) {
      for (let a = 0; a < allManagers[i]?.manager_location?.length; a++) {
        const noOfPatients = await getCount("patient", {
          location_id: allManagers[i]?.manager_location[a]?._id,
        });
        const noOfEmployees = await getCount("user", {
          employee_location: allManagers[i]?.manager_location[a]?._id,
        });
        allManagers[i].manager_location[a].noOfPatients = noOfPatients;
        allManagers[i].manager_location[a].noOfEmployees = noOfEmployees;
      }
    }
    return res.status(200).send({ status: 200, allManagers });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getAllManagerlocations;
