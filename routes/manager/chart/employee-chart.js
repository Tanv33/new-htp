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
    const { manager_location } = manager;
    const data = await getAggregate("patient", [
      // {
      //   $facet: {
      //     location_id: [
      //       {
      //         $match: {
      //           location_id: manager_location[1],
      //         },
      //       },
      //       { $count: "location_id" },
      //     ],
      //   },
      // },
      {
        // $match: { $expr: { location_id: { $in: manager_location } } },
        $count: "type",
      },
    ]);
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
