const { getPopulatedData, find } = require("../../../helpers");

const getAllLocation = async (req, res) => {
  try {
    const allLocations = await getPopulatedData(
      "user",
      { _id: req.userId },
      "type manager_location"
    );
    const { manager_location } = allLocations[0];
    // let noOfPatientArr = [];
    // for (let index = 0; index < allLocations.length; index++) {
    //   let noOfPatient = await find("patient", { _id: allLocations[index]._id });
    //   console.log(noOfPatient);
    //   noOfPatientArr.push(noOfPatient.length);
    // }
    // await allLocations.map(async (object) => {
    //   let noOfPatient = await find("patient", { _id: object._id });
    //   console.log(noOfPatient);
    //   noOfPatientArr.push(noOfPatient.length);
    // });
    // console.log(noOfPatientArr);
    return res
      .status(200)
      .send({ status: 200, allLocations: manager_location });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getAllLocation;
