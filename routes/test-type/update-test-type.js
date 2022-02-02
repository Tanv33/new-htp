const { pushIfNotExists } = require("../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  types: Joi.string().required(),
});

const updateTestType = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const test_type_updated = await pushIfNotExists(
      "testType",
      { _id: req.params.id },
      { types: req.body.types }
    );
    return res.status(200).send({ status: 200, test_type_updated });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = updateTestType;
