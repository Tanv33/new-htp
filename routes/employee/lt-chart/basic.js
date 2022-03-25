const { getAggregate, findOne, find } = require("../../../helpers");

const basicChart = async (req, res) => {
  try {
    const user = await findOne("user", { _id: req.userId });
    const { employee_location } = user;
    const mdType = await findOne("userType", {
      type: "Medical Profession",
    });
    const medicalProfessions = await find("user", {
      employee_location,
      type: mdType?._id,
    });
    // console.log(medicalProfessions);

    // Graph 1
    const graph1 = await getAggregate("patient", [
      {
        $match: {
          location_id: employee_location,
          "test_type.type": { $ne: "Rapid" },
          is_tested: "Yes",
        },
      },
      {
        $group: {
          _id: "$patient_result",
          noOfPatient: {
            $sum: 1,
          },
        },
      },
      {
        $addFields: { patient_result: "$_id" },
      },
      {
        $project: { _id: 0 },
      },
    ]);

    // Graph 2
    const graph2 = await getAggregate("patient", [
      {
        $match: {
          location_id: employee_location,
          "test_type.type": { $ne: "Rapid" },
          is_tested: "Yes",
        },
      },
      {
        $group: {
          _id: "$created_by",
          negative: {
            $sum: {
              $cond: [{ $eq: ["$patient_result", "Negative"] }, 1, 0],
            },
          },
          positive: {
            $sum: {
              $cond: [{ $eq: ["$patient_result", "Positive"] }, 1, 0],
            },
          },
          inconclusive: {
            $sum: {
              $cond: [{ $eq: ["$patient_result", "Inconclusive"] }, 1, 0],
            },
          },
          pending: {
            $sum: {
              $cond: [{ $eq: ["$patient_result", "Pending"] }, 1, 0],
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "employee",
        },
      },
      // {
      //   $project: {
      //     "employee.first_name": 1,
      //     "employee.last_name": 1,
      //   },
      // },
      // {
      //   $addFields: { is_tested: "$_id" },
      // },
      // {
      //   $project: { _id: 0 },
      // },
    ]);

    return res.status(200).send({ status: 200, graph1, graph2 });
    // return res.status(200).send({ status: 200, graph1 });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = basicChart;
