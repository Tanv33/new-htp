const { findOne, getCount, findOneAndPopulate } = require("../../../helpers");

const employeeChart = async (req, res) => {
  try {
    const manager = await findOneAndPopulate(
      "user",
      { _id: req.userId },
      "manager_location",
      "location_name"
    );
    const medicalProfession = await findOne("userType", {
      type: "Medical Profession",
    });
    const labTechnicican = await findOne("userType", {
      type: "Lab Technician",
    });
    let employeeChartArr = [];
    const { manager_location } = manager;
    for (let i = 0; i < manager_location.length; i++) {
      const noOfLabTechnician = await getCount("user", {
        employee_location: manager_location[i]?._id,
        type: labTechnicican._id,
      });
      const noOfMedicalProfession = await getCount("user", {
        employee_location: manager_location[i]?._id,
        type: medicalProfession._id,
      });
      let obj = {};
      obj.location_id = manager_location[i]?._id;
      obj.location_name = manager_location[i]?.location_name;
      obj.medicalProfession = noOfMedicalProfession;
      obj.labTechnicican = noOfLabTechnician;
      employeeChartArr.push(obj);
    }
    return res
      .status(200)
      .send({ status: 200, length: employeeChartArr.length, employeeChartArr });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = employeeChart;
