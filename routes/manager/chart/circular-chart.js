const { findOne, find, getAggregate } = require("../../../helpers");

const circularChart = async (req, res) => {
  try {
    const manager = await findOne("user", { _id: req.userId });
    const { manager_location } = manager;
    const totalPatient = await getAggregate("patient", [
      {
        $match: { location_id: { $in: manager_location } },
      },
      // {
      //   $project: {
      //     test_type: 1,
      //   },
      // },
      {
        $group: {
          _id: "$test_type.name",
          noOfPatient: {
            $sum: 1,
          },
          // types: {
          //   $push: "$test_type.type",
          // },
        },
      },
      // {
      //   $project: {
      //     // first_name: 1,
      //     _id: 0,
      //     "test_type.name": 1,
      //     "test_type.type": 1,
      //   },
      // },
    ]);
    return res.status(200).send({ status: 200, totalPatient });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = circularChart;
