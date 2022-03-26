const Joi = require("joi");
const { findOne, pushIfNotExists } = require("../../helpers");

const schema = Joi.object({
  name: Joi.string().required(),
  types: Joi.array().required(),
});
const addUserTestType = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { name, types } = req.body;
    // Add name and Types
    await pushIfNotExists(
      "user",
      {
        _id: req.userId,
      },
      {
        user_test_type: { name, types },
      }
    );
    const user = await findOne("user", {
      _id: req.userId,
    });
    const { user_test_type } = user;
    return res.status(200).send({
      status: 200,
      user_test_type,
    });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = addUserTestType;
