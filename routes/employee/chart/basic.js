const { getAggregate } = require("../../../helpers");
const { ObjectID } = require("../../../types");

const basicGraph = async (req, res) => {
  try {
    // Graph 1
    const graph1 = await getAggregate("patient", [
      {
        $match: { created_by: ObjectID(req.userId) },
      },
      {
        $group: {
          _id: "$test_type.name",
          noOfPatient: {
            $sum: 1,
          },
        },
      },
    ]);

    // Graph 2
    const graph2 = await getAggregate("patient", [
      {
        $match: { created_by: ObjectID(req.userId) },
      },
      {
        $group: {
          _id: { type: "$test_type.type", name: "$test_type.name" },
          noOfPatient: {
            $sum: 1,
          },
        },
      },
      {
        $sort: { "_id.name": 1 },
      },
    ]);

    // Graph 3
    const months = [
      "",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const graph3 = await getAggregate("patient", [
      {
        $match: { created_by: ObjectID(req.userId) },
      },
      {
        $group: {
          _id: {
            monthNumber: { $month: "$createdAt" },
            // year: { $year: "$createdAt" },
            year: { $year: new Date() },
          },
          totalPatient: {
            $sum: 1,
          },
          testedPatient: {
            $sum: {
              $cond: [{ $eq: ["$is_tested", "Yes"] }, 1, 0],
            },
          },
          unTestedPatient: {
            $sum: {
              $cond: [{ $eq: ["$is_tested", "No"] }, 1, 0],
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    for (let i = 0; i < graph3.length; i++) {
      graph3[i].month = months[graph3[i]._id.monthNumber];
    }
    return res.status(200).send({ status: 200, graph1, graph2, graph3 });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = basicGraph;
