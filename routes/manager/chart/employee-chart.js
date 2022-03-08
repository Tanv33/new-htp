const { findOne, getCount } = require("../../../helpers");

const employeeChart = async (req, res) => {
  try {
    const manager = await findOne("user", { _id: req.userId });
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
        employee_location: manager_location[i],
        type: labTechnicican._id,
      });
      const noOfMedicalProfession = await getCount("user", {
        employee_location: manager_location[i],
        type: medicalProfession._id,
      });
      let obj = {};
      obj.location = manager_location[i];
      obj.medicalProfession = noOfMedicalProfession;
      obj.labTechnicican = noOfLabTechnician;
      employeeChartArr.push(obj);
    }
    return res.status(200).send({ status: 200, employeeChartArr });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = employeeChart;
