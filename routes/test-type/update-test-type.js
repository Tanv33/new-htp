const {
  updateDocument,
  pushIfNotExists,
  findOneAndUpdate,
} = require("../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string(),
  deleteType: Joi.array(),
  addType: Joi.array(),
});

const updateTestType = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { deleteType, addType, name } = req.body;
    if (name) {
      await updateDocument("testType", { _id: req.params.id }, { name });
      return res
        .status(200)
        .send({ status: 200, message: "Name updated successfully" });
    }
    if (deleteType) {
      await findOneAndUpdate(
        "testType",
        { _id: req.params.id },
        {
          $pullAll: {
            types: deleteType,
          },
        }
      );
      return res
        .status(200)
        .send({ status: 200, message: "Type deleted successfully" });
    }
    if (addType) {
      await pushIfNotExists(
        "testType",
        { _id: req.params.id },
        { types: addType }
      );
      return res
        .status(200)
        .send({ status: 200, message: "Type added successfully" });
    }
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = updateTestType;
