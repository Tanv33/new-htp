const { findOne, find } = require("../../../helpers");

const circularChart = async (req, res) => {
  try {
    const manager = await findOne("user", { _id: req.userId });
    const { manager_location } = manager;
    // const totalPatient = await find("patient", {
    //   location_id: { $in: manager_location },
    // });
    return res.status(200).send({ status: 200, manager_location });
    //   .send({ status: 200, totalPatient, length: totalPatient.length });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = circularChart;
