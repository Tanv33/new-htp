const Joi = require("joi");
const { find, getDataWithLimit } = require("../../helpers");

const newSchema = Joi.object({
  tested: Joi.string().required(),
  page: Joi.string().required(),
});
const getPatient = async (req, res) => {
  try {
    await newSchema.validateAsync(req.query);
    const { tested, page } = req.query;
    const patients = await getDataWithLimit(
      "patient",
      {
        created_by: req.userId,
        is_tested: tested,
      },
      { _id: -1 },
      page,
      2
    );
    return res.status(200).send({ status: 200, patients });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getPatient;
