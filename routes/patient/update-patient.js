const {
  updateDocument,
  dateFormat,
  todayDateFormat,
} = require("../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  date_of_birth: Joi.date(),
  gender: Joi.string(),
  pregnant: Joi.string(),
  sex_assign_at_birth: Joi.string(),
  race: Joi.string(),
  language: Joi.string(),
  ethnicity: Joi.string(),
  marital_status: Joi.string(),
  email: Joi.string().email(),
  telephone: Joi.string(),
  address: Joi.string(),
  state: Joi.string(),
  city: Joi.string(),
  postal_code: Joi.string(),
  payment: Joi.string(),
  employment: Joi.string(),
  insurance_name: Joi.string(),
  insurance_policy_number: Joi.string(),
  us_id: Joi.string(),
  us_id_no: Joi.string(),
  ssn: Joi.string(),
  is_tested: Joi.string(),
  test_type: Joi.object(),
  pid: Joi.string(),
});

const updatePatient = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { is_tested } = req.body;
    if (is_tested === "Yes") {
      req.body.tested_date = todayDateFormat();
    }
    const patient_updated = await updateDocument(
      "patient",
      { _id: req.params.id },
      req.body
    );
    return res.status(200).send({ status: 200, patient_updated });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = updatePatient;
