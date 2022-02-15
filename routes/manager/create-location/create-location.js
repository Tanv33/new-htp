const {
  insertNewDocument,
  pushIfNotExists,
  getDropBoxLink,
  generateRandomNumber,
  findOne,
} = require("../../../helpers");
const Joi = require("joi");
const fs = require("fs");

const schema = Joi.object({
  location_name: Joi.string().required(),
  email: Joi.string().email().required(),
  zip_code: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  // state: Joi.string().required(),
  test: Joi.array().required(),
  location_logo: Joi.string(),
  patient_required_fields: Joi.array().required(),
});

const createLocation = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    if (!req.body.location_logo) {
      if (!req.file) {
        return res
          .status(400)
          .send({ status: 400, message: "Location Logo Required" });
      }
    }
    if (req.file) {
      req.body.location_logo = await getDropBoxLink(
        "/location logo/" +
          generateRandomNumber(1111, 9999) +
          "-" +
          req.file.filename,
        req.file.path
      );
      await fs.unlinkSync(req.file.path);
    }

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
