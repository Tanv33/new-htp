const Joi = require("joi");
const { insertNewDocument, findOne } = require("../../../helpers");
const schema = Joi.object({
  vendor_name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .required(),
  vendor_locations: Joi.array().required(),
});
const createVendor = async (req, res) => {
  try {
    // const { email, password } = req.body;
    // const check_email_exist = await findOne("vendor", { email });
    // if (check_email_exist) {
    //   return res
    //     .status(404)
    //     .send({ status: 404, message: "Vendor already exist!" });
    // }
    // const newvendor = {
    //   ...req.body,
    //   password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    // };
    // await schema.validateAsync(req.body);
    // await insertNewDocument("user", { ...req.body });
    // return res.status(200).send("Vendor Created Successfully");
    return res.status(200).send(req.body);
  } catch (e) {
    console.log(e);
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = createVendor;
