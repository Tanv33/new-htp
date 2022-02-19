const Joi = require("joi");
const {
  insertNewDocument,
  findOne,
  getPopulatedData,
  find,
  searchDocuments,
  getDropBoxLink,
  _base64ToArrayBuffer,
  generateRandomNumber,
} = require("../../../helpers");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const { send_email } = require("../../../lib");
const {
  managerVerification,
  tokenVerification,
} = require("../../../middleware");

const managerSchema = Joi.object({
  full_name: Joi.string().required(),
  email: Joi.string().email().required(),
  mid: Joi.string().required(),
  telephone: Joi.string().min(17).required(),
  lab_name: Joi.string().required(),
  lab_address: Joi.string().required(),
  manager_signature: Joi.string().required(),
  type: Joi.string().required(),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .required(),
});
const employeeSchema = Joi.object({
  type: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  date_of_birth: Joi.date().required(),
  telephone: Joi.string().min(17).required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zip_code: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .required(),
  mid: Joi.string().required(),
  employee_location: Joi.string().required(),
});
const adminSchema = Joi.object({
  full_name: Joi.string().required(),
  email: Joi.string().email().required(),
  type: Joi.string().required(),
  telephone: Joi.string().min(17).required(),
  password: Joi.string().min(6).required(),
});
const vendorSchema = Joi.object({
  vendor_name: Joi.string().required(),
  vendor_locations: Joi.array().required(),
  email: Joi.string().email().required(),
  type: Joi.string().required(),
  mid: Joi.string().required(),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .required(),
});

const signUpUser = async (req, res, next) => {
  const {
    full_name,
    lab_name,
    lab_address,
    email,
    password,
    first_name,
    last_name,
    type,
    mid,
    telephone,
    date_of_birth,
    employee_location,
    address,
    manager_signature,
    city,
    state,
    zip_code,
    location,
  } = req.body;
  try {
    // For Asins
    if (type === "Asins") {
      await adminSchema.validateAsync(req.body);
      const check_email_exist = await findOne("user", { email });
      if (check_email_exist) {
        return res
          .status(404)
          .send({ status: 404, message: "User already exist!" });
      }
      const check_user_type_exist = await findOne("userType", { type });
      if (!check_user_type_exist) {
        return res
          .status(404)
          .send({ status: 404, message: "User Type not exist!" });
      }
      const { _id } = check_user_type_exist;
      const new_user = await insertNewDocument("user", {
        full_name,
        email,
        telephone,
        type: _id,
        status: "Active",
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      });
      return res.status(200).send({ status: 200, user: new_user });
    }
    // For Vendor
    if (type === "Vendor") {
      await tokenVerification(req, res, next);
      await managerVerification(req, res, next);
      await vendorSchema.validateAsync(req.body);
      const check_email_exist = await findOne("user", { email });
      if (check_email_exist) {
        return res
          .status(404)
          .send({ status: 404, message: "User already exist!" });
      }
      const check_user_type_exist = await findOne("userType", { type });
      if (!check_user_type_exist) {
        return res
          .status(404)
          .send({ status: 404, message: "User Type not exist!" });
      }
      const { _id } = check_user_type_exist;
      const new_user = await insertNewDocument("user", {
        ...req.body,
        type: _id,
        status: "Active",
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      });
      return res.status(200).send({ status: 200, user: new_user });
    }
    // For Manager
    if (type === "Manager") {
      // check string is of base64 or not
      const base64regex =
        /^data:image\/[a-z]+;base64,([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
      if (!base64regex.test(manager_signature)) {
        return res.status(400).send({
          status: 400,
          message: "Manager Signature should be in base64",
        });
      }

      let imageType = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
      if (!req.files.manager_logo) {
        return res.status(400).send({
          status: 400,
          message: "Manager Logo Required",
        });
      }
      if (req.files) {
        if (!imageType.includes(req.files.manager_logo[0].mimetype)) {
          return res.status(400).send({
            status: 400,
            message: "Manager logo should be an image",
          });
        }
      }
      await managerSchema.validateAsync(req.body);
      const check_mid_exist = await findOne("user", { mid });
      if (check_mid_exist) {
        return res
          .status(404)
          .send({ status: 404, message: "MID already exist!" });
      }
      const check_email_exist = await findOne("user", { email });
      if (check_email_exist) {
        return res
          .status(404)
          .send({ status: 404, message: "User already exist!" });
      }
      const check_user_type_exist = await findOne("userType", { type });
      if (!check_user_type_exist) {
        return res
          .status(404)
          .send({ status: 404, message: "User Type not exist!" });
      }
      const { _id } = check_user_type_exist;
      req.body.manager_logo = await getDropBoxLink(
        "/managerlogos/" + mid + "-" + req.files.manager_logo[0].filename,
        req.files.manager_logo[0].path
      );

      req.body.manager_signature = await getDropBoxLink(
        "/manager signature/" +
          mid +
          "-" +
          generateRandomNumber(11111, 99999) +
          ".png",
        _base64ToArrayBuffer(
          manager_signature.replace(/^data:image\/[a-z]+;base64,/, "")
        ),
        true
      );
      const new_user = await insertNewDocument("user", {
        full_name,
        email,
        mid,
        telephone,
        lab_name,
        lab_address,
        type: _id,
        manager_logo: req.body.manager_logo,
        manager_signature: req.body.manager_signature,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      });
      // res.status(200).send({ status: 200, user: new_user });
      send_email(
        res,
        "accoutCreatedTemp",
        {
          username: full_name,
          manager_logo: req.body.manager_logo,
          email: email,
          telephone: telephone,
          lab_address: lab_address,
        },
        "Health Titan Pro",
        "Account Created",
        email
      );
      fs.unlinkSync(req.files.manager_logo[0].path);
      return res.status(200).send({ status: 200, user: new_user });
    }
    // For Employees
    let user_types = await searchDocuments("userType", {
      type: { $nin: ["Manager", "Asins"] },
    });
    user_types = user_types.map((item) => item.type);
    if (user_types.includes(type)) {
      await employeeSchema.validateAsync(req.body);
      const findManagerId = await findOne("userType", { type: "Manager" });
      // Get  matching mid with manager
      const populatedUser = await getPopulatedData(
        "user",
        { mid, type: findManagerId._id },
        "type",
        "type"
      );
      if (!populatedUser.length) {
        return res
          .status(404)
          .send({ status: 404, message: "MID doesn't match" });
      }
      const check_email_exist = await findOne("user", { email });
      if (check_email_exist) {
        return res
          .status(404)
          .send({ status: 404, message: "User already exist!" });
      }
      const check_user_type_exist = await findOne("userType", { type });
      if (!check_user_type_exist) {
        return res
          .status(404)
          .send({ status: 404, message: "User Type not exist!" });
      }
      const { _id } = check_user_type_exist;
      const new_user = await insertNewDocument("user", {
        first_name,
        last_name,
        date_of_birth,
        telephone,
        address,
        city,
        employee_location,
        state,
        zip_code,
        location,
        email,
        mid,
        type: _id,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      });
      send_email(
        res,
        "accoutCreatedTemp",
        {
          username: first_name,
          manager_logo: populatedUser[0].manager_logo,
          email: populatedUser[0].email,
          telephone: populatedUser[0].telephone,
          lab_address: populatedUser[0].lab_address,
        },
        "Health Titan Pro",
        "Account Created",
        email
      );
      return res.status(200).send({ status: 200, user: new_user });
    }
    if (!user_types.includes(type)) {
      return res
        .status(400)
        .send({ status: 400, message: "Please input correct credentials" });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = signUpUser;
