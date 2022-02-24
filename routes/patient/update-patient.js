const { updateDocument } = require("../../helpers");
// const Joi = require("joi");

// const schema = Joi.object({
//   first_name: Joi.string().required(),
//   last_name: Joi.string().required(),
//   gender: Joi.string().required(),
//   email: Joi.string().email().required(),
//   delivery_method: Joi.array().required(),
//   is_tested: Joi.string(),
//   is_insured: Joi.boolean(),
//   telephone: Joi.string().min(14).required(),
//   address: Joi.string().required(),
//   city: Joi.string().required(),
//   state: Joi.string().required(),
//   zip_code: Joi.string().required(),
//   date_of_birth: Joi.date().required(),
//   age: Joi.number().required(),
//   created_by: Joi.string().required(), //user Id Here
//   location: Joi.string(),
//   signature: Joi.string().required(), // PDF file Here
//   doc_prescription: Joi.boolean(),
//   doc_prescription_url: Joi.string().required(),
//   test_type: Joi.string().required(),
//   uuid: Joi.number().required(),
//   sex: Joi.string().required(),
//   passport: Joi.boolean(),
//   covid_test_form: Joi.string().required(), // PDF file
//   id_image: Joi.string().required(),
//   identity_card: Joi.string().required(),
//   insurance_image: Joi.string().required(),
//   patient_test_result_sign_off: Joi.string().required(), // PDF file
//   tested_by: Joi.string().required(), // Object id of who tested
//   tested_date: Joi.date().required(),
// });

const updatePatient = async (req, res) => {
  try {
    // await schema.validateAsync(req.body);
    const test_type_updated = await updateDocument(
      "patient",
      { _id: req.params.id },
      req.body
    );
    return res.status(200).send({ status: 200, test_type_updated });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = updatePatient;
