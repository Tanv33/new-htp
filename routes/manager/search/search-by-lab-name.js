const { getPopulatedData } = require("../../../helpers");

const getEmployeesByLabName = async (req, res) => {
  try {
    const manager = await findOne("user", { _id: req.userId });
    const employeeArray = await getPopulatedData(
      "user",
      {
        mid: manager.mid,
        _id: { $ne: req.userId },
        lab_name: { $regex: req.query.lab_name, $options: "i" },
      },
      "type employee_location"
    );
    return res.status(200).send({ status: 200, employeeArray });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getEmployeesByLabName;
