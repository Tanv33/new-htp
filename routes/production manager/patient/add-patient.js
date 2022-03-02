const fs = require("fs");
const addPatient = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .send({ status: 400, mesaage: "CSV file required" });
    }
    // if (req.file.mimetype) {
    // }
    console.log(req.file);
    // const readFile = fs.readFileSync(req.file.path, "utf8");

    // console.log(readFile);
    // return res.status(200).send("dada");
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, mesaage: e.message });
  }
};
module.exports = addPatient;
