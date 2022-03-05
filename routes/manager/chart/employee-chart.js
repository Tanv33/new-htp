const { findOne, find, getAggregate } = require("../../../helpers");

const employeeChart = async (req, res) => {
  try {
    const manager = await findOne("user", { _id: req.userId });
    const medicalProfession = await findOne("userType", {
      type: "Medical Profession",
    });
    const labTechnicican = await findOne("userType", {
      type: "Lab Technician",
    });
    const data = await getAggregate("patient", [
      // stage 1
      // { $match: {} },

      // stage 2
      {
        $group: {
          _id: {
            test_name: "$test_type.name",
            test_type: "$test_type.type",
          },
        },
      },
    ]);
    const { manager_location } = manager;
    return res.status(200).send({
      status: 200,
      // medicalProfession,
      // manager_location,
      // labTechnicican,
      data,
      adad: data.length,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = employeeChart;
