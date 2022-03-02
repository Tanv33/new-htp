const { csvFileArr } = require("../../../helpers");
const addPatient = async (req, res) => {
  try {
    console.log(req.file);
    if (!req.file) {
      return res
        .status(400)
        .send({ status: 400, mesaage: "CSV file required" });
    }
    if (req.file.mimetype !== "text/csv") {
      return res
        .status(400)
        .send({ status: 400, mesaage: "Only CSV file allowed" });
    }
    const resultArr = await csvFileArr(req.file.path);
    return res.status(200).send({ status: 200, resultArr });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, mesaage: e.message });
  }
};
module.exports = addPatient;
