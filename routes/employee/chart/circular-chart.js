const { getAggregate } = require("../../../helpers");

const circularChart = async(req, res) => {
  try {
    const totalPatient = await getAggregate("patient", [
      {
        $match: { created_by: req.userId },
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
    return res.status(200).send({ status: 200, totalPatient });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = circularChart;
