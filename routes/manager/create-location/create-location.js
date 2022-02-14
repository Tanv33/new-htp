const { insertNewDocument, pushIfNotExists } = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  location_name: Joi.string().required(),
  email: Joi.string().email().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  address: Joi.string().required(),
  zip_code: Joi.string().required(),
  test: Joi.array().required(),
  patient_required_fields: Joi.object().required(),
});

const createLocation = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const locationCreated = await insertNewDocument("location", req.body);
    const { _id } = locationCreated;
    console.log({ locationCreated });
    await pushIfNotExists(
      "user",
      { _id: req.userId },
      { manager_location: _id }
    );
    return res
      .status(200)
      .send({ status: 200, message: "Location Created Successfully" });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = createLocation;
