const Joi = require("joi");
const {
  insertNewDocument,
  findOne,
  getPopulatedData,
  find,
  searchDocuments,
} = require("../../../helpers");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const { send_email, dbx } = require("../../../lib");

const managerSchema = Joi.object({
  full_name: Joi.string().required(),
  email: Joi.string().email().required(),
  mid: Joi.string().required(),
  telephone: Joi.string().min(14).required(),
  lab_name: Joi.string().required(),
  lab_address: Joi.string().required(),
  type: Joi.string().required(),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .required(),
});
const employeeSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  date_of_birth: Joi.date().required(),
  telephone: Joi.string().min(14).required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zip_code: Joi.string().required(),
  email: Joi.string().email().required(),
  type: Joi.string().required(),
  location: Joi.string().required(),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .required(),
  mid: Joi.string().required(),
});
const adminSchema = Joi.object({
  full_name: Joi.string().required(),
  email: Joi.string().email().required(),
  type: Joi.string().required(),
  telephone: Joi.string().min(14).required(),
  password: Joi.string().min(6).required(),
});

const signUpUser = async (req, res) => {
  const {
    full_name,
    lab_name,
    lab_address,
    email,
    password,
    first_name,
    last_name,
    type,
    status,
    mid,
    telephone,
    date_of_birth,
    address,
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
    // For Manager
    if (type === "Manager") {
      console.log(req.file);
      if (!req.file) {
        return res.status(400).send({
          status: 400,
          message: "Manager Logo Required key should be manager_logo",
        });
      }
      let imageType = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
      if (req.file) {
        if (!imageType.includes(req.file.mimetype)) {
          return res.status(400).send({
            status: 400,
            message: "File should be an image",
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
      const logoUpload = await dbx.filesUpload({
        path: "/managerlogos/" + mid + "-" + req.file.filename,
        contents: fs.readFileSync(req.file.path),
      });
      if (!logoUpload) {
        return res
          .status(400)
          .send({ status: 400, message: "Error in uploading Manager Logo" });
      }
      const mangerLogoSharedLink =
        await dbx.sharingCreateSharedLinkWithSettings({
          path: logoUpload.result.path_display,
          settings: {
            requested_visibility: "public",
            audience: "public",
            access: "viewer",
          },
        });
      if (!mangerLogoSharedLink) {
        return res.status(400).send({
          status: 400,
          message: "Error in getting link of Manager Logo",
        });
      }
      req.body.manager_logo = mangerLogoSharedLink.result.url?.replace(
        /dl=0$/,
        "raw=1"
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
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      });
      // res.status(200).send({ status: 200, user: new_user });
      send_email(
        res,
        "accoutCreatedTemp",
        { username: full_name, manager_logo: req.body.manager_logo },
        "American Specialty Lab",
        "Account Created",
        email
      );
      fs.unlinkSync(req.file.path);
      return res.status(200).send({ status: 200, user: new_user });
    }
    // For Employees
    let user_types = await searchDocuments("userType", {
      type: { $nin: ["Manager", "Asins"] },
    });
    user_types = user_types.map((item) => item.type);
    if (user_types.includes(type)) {
      await employeeSchema.validateAsync(req.body);
      // Get all matching mid
      const populatedUser = await getPopulatedData(
        "user",
        { mid },
        "type",
        "type"
      );
      if (!populatedUser.length) {
        return res
          .status(404)
          .send({ status: 404, message: "MID doesn't match" });
      }
      // filtering Manager mid exist or not
      const user = populatedUser.filter(
        (populatedUser) => populatedUser.type.type === "Manager"
      );
      if (!user.length) {
        return res
          .status(404)
          .send({ status: 404, message: "There is no Manager with this MID" });
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
        { username: first_name, manager_logo: user[0].manager_logo },
        "American Specialty Lab",
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
    if (req?.file?.path) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = signUpUser;
