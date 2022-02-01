const { updateDocument } = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  lab_required_fields: Joi.array().required(),
});

const createLocation = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { lab_required_fields } = req.body;
    await updateDocument("user", { _id: req.userId }, { lab_required_fields });
    return res
      .status(200)
      .send({ status: 200, message: "Fields Added Successfully" });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = createLocation;
