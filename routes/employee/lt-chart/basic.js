const { getAggregate, findOne } = require("../../../helpers");

const basicChart = async (req, res) => {
  try {
    const user = await findOne("user", { _id: req.userId });
    const { employee_location } = user;
    const graph1 = await getAggregate("patient", [
      {
        $match: {
          location_id: employee_location,
          "test_type.type": { $ne: "Rapid" },
        },
      },
      {
        $group: {
          _id: "$is_tested",
          noOfPatient: {
            $sum: 1,
          },
        },
      },
      {
        $addFields: { is_tested: "$_id" },
      },
      {
        $project: { _id: 0 },
      },
    ]);
    return res.status(200).send({ status: 200, graph1 });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = basicChart;
