const Joi = require("joi");
const {
  base64regex,
  getDropBoxLink,
  _base64ToArrayBuffer,
  generateRandomNumber,
  findOne,
  insertNewDocument,
  findOneAndSelect,
} = require("../../helpers");
const reTestSchema = Joi.object({
  _id: Joi.string().required(),
  patient_signature: Joi.string().required(),
});
const reTestPatient = async (req, res) => {
  try {
    await reTestSchema.validateAsync(req.body);
    const { _id, patient_signature } = req.body;
    if (!base64regex.test(patient_signature)) {
      return res.status(400).send({
        status: 400,
        message: "Patient Signature should be in base64",
      });
    }
    const patientSignatureLink = await getDropBoxLink(
      "/patient signature/" +
        `patient-signature-${generateRandomNumber(11111, 99999).toFixed(
          0
        )}.png`,
      _base64ToArrayBuffer(
        patient_signature.replace(/^data:image\/[a-z]+;base64,/, "")
      ),
      true
    );
    const patient = await findOneAndSelect(
      "patient",
      { _id },
      "-_id -__v -created_date -createdAt -updatedAt"
    );
    if (!patient) {
      return res
        .status(404)
        .send({ status: 404, message: "No Patient Found with your given id" });
    }
    patient.patient_signature = patientSignatureLink;

    // const reCreatePatient = await insertNewDocument("patient", patient);
    return res
      .status(200)
      .send({
        status: 200,
        message: "Patient Recreated Successfully",
        patient,
      });
  } catch (e) {
    console.log("reTestPatient", e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = reTestPatient;
