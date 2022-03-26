const { updateDocument, findOne } = require("../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  preName: Joi.string(),
  name: Joi.string(),
  types: Joi.array(),
});

const updateUserTestType = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { preName, name, types } = req.body;
    // Update Name
    if (preName) {
      await updateDocument(
        "user",
        {
          _id: req.userId,
          user_test_type: {
            $elemMatch: {
              name: preName,
            },
          },
        },
        {
          "user_test_type.$.name": name,
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
    }
    // Update Array
    if (types) {
      await updateDocument(
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
          "user_test_type.$.types": types,
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
    }
    return res.status(400).send({
      status: 200,
      message: "Please input correct credentials",
    });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = updateUserTestType;
