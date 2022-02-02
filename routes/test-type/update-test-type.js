const { updateDocument } = require("../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  type: Joi.array().required(),
});

const updateTestType = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const test_type_updated = await updateDocument(
      "testType",
      { _id: req.params.id },
      req.body
    );
    return res.status(200).send({ status: 200, test_type_updated });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = updateTestType;
