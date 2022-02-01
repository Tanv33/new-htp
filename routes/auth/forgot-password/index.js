const Joi = require("joi");
const nodemailer = require("nodemailer");
const { insertNewDocument, findOne } = require("../../../helpers");
const bcrypt = require("bcryptjs");
const {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASS,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
} = require("../../../config");
const { send_email } = require("../../../lib");

const schema = Joi.object({
  preferred_method: Joi.string().required().valid("Email", "Telephone"),
  email: Joi.string()
    .email()
    .when("preferred_method", { is: "Email", then: Joi.required() }),
  telephone: Joi.string().min(14).when("preferred_method", {
    is: "Telephone",
    then: Joi.required(),
  }),
});

const forgetPassword = async (req, res) => {
  const { email, telephone } = req.body;
  try {
    await schema.validateAsync(req.body);
    if (email) {
      const check_email = await findOne("user", { email });
      if (!check_email) {
        return res
          .status(400)
          .send({ status: 400, message: "Email not exist" });
      }
      // Function for creating OTP key
      const generateRandomNumber = (min, max) =>
        Math.random() * (max - min) + min;
      const otp_key = generateRandomNumber(11111, 99999).toFixed(0);
      await insertNewDocument("otp", {
        otp_key: bcrypt.hashSync(otp_key, bcrypt.genSaltSync(10)),
        email,
      });
      send_email(
        res,
        "forgotPassword",
        { username: check_email.username, OTP: otp_key },
        "American Specialty Lab",
        "Verification Key",
        email
      );
    }
    if (telephone) {
      // Twilio verification
      const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
      const check_telephone = await findOne("user", { telephone });
      if (!check_telephone) {
        return res
          .status(400)
          .send({ status: 400, message: "Number not exist" });
      }
      // Function for creating OTP key
      const generateRandomNumber = (min, max) =>
        Math.random() * (max - min) + min;
      const otp_key = generateRandomNumber(11111, 99999).toFixed(0);
      await insertNewDocument("otp", {
        otp_key: bcrypt.hashSync(otp_key, bcrypt.genSaltSync(10)),
        telephone,
      });

      client.messages.create(
        {
          body: `Your OTP verification code is ${otp_key}`,
          from: "+19103874951", // company telephone
          to: telephone, // client telephone number (telephone)
        },
        (err, mess) => {
          if (err) {
            return res.status(400).send({ status: 400, message: err });
          }
          return res.status(400).send({ status: 200, message: mess.sid });
        }
      );
    }
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = forgetPassword;
