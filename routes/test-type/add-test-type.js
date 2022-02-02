const Joi = require("joi");
const { insertNewDocument } = require("../../helpers");

const schema = Joi.object({
  name: Joi.string().required(),
});

const addTestType = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const test_type = await insertNewDocument("testType", req.body);
    return res.status(200).send({ status: 200, test_type });
  } catch (e) {
    return res.status(400).send({ status: 400, messagw: e.message });
  }
};
module.exports = addTestType;
