const Joi = require("joi");
const { find } = require("../../helpers");

const newSchema = Joi.object({
  tested: Joi.string().required(),
});
const getPatient = async (req, res) => {
  try {
    await newSchema.validateAsync(req.query);
    const { tested } = req.query;
    let patients = await find("patient", {
      created_by: req.userId,
      is_tested: tested,
    });
    return res.status(200).send({ status: 200, patients });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getPatient;
