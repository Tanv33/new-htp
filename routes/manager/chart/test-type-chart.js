const { findOne, getAggregate } = require("../../../helpers");

const testTypesChart = async (req, res) => {
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
        // $group: {
        //   _id: "$test_type.type",
        //   count: {
        //     $sum: 1,
        //   },

        $group: {
          _id: { type: "$test_type.type", name: "$test_type.name" },
          noOfPatient: {
            $sum: 1,
          },
          // $addFields: {
          //   name: "$test_type.name",
          // },
          //   letsSee: {
          //     $sum: {
          //       $cond: [{ $eq: ["$test_type.type", ""] }, 1, 0],
          //     },
          //   },
          //   arr: {
          //     $addToSet: "$test_type.type",
          //   },

          // arr: {
          //   $push: "$test_type.type",
          // },
          // object: {
          //   $mergeObjects: { name: "$test_type.type" },
          // },
          // types: {
          //   $addToSet: "$test_type.type",
          // },
          // sum: {
          //   $sum: "$test_type.type",
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
      {
        $sort: { "_id.name": 1 },
      },
    ]);
    return res.status(200).send({ status: 200, totalPatient });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = testTypesChart;
