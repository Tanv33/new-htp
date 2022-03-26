const { findOne, customUpdate } = require("../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
});

const deleteUserTestType = async (req, res) => {
  try {
    await schema.validateAsync(req.query);
    const { name } = req.query;
    // Delete Specific Object
    await customUpdate(
      "user",
      {
        _id: req.userId,
        user_test_type: {
          $elemMatch: {
            name,
          },
        },
      },
      {
        $pull: {
          user_test_type: {
            name,
          },
        },
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

module.exports = deleteUserTestType;
