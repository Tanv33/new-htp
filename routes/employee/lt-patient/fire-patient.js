const Joi = require("joi");

const newSchema = Joi.object({
  order_no: Joi.number().required(),
  pid: Joi.string().required(),
  patient_result: Joi.string().required(),
});

const firePatient = async (req, res) => {
  try {
    await newSchema.validateAsync(req.body);
    return res.status(200).send({ status: 200, message: "Api is in progress" });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = firePatient;
