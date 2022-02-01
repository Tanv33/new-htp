const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../../../config");
const { getPopulatedData } = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
});

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    await schema.validateAsync(req.body);
    // get matching emails
    const populatedUser = await getPopulatedData(
      "user",
      { email },
      "type",
      "type status"
    );
    const user = populatedUser[0];
    if (user) {
      // For Asins Specific
      if (user.type.type === "Asins") {
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
          return res
            .status(404)
            .send({ status: 400, message: "Invalid Email or Password!" });
        }
        user.password = undefined;
        if (user.type.status !== "Active") {
          return res.status(405).send({
            status: 405,
            message: "Your Admin Type is not Active",
          });
        }
        var token = jwt.sign({ id: user._id }, SECRET);
        return res.status(200).send({ status: 200, user, token });
      }
      // For Manager and others
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res
          .status(404)
          .send({ status: 400, message: "Invalid Email or Password!" });
      }
      user.password = undefined;
      if (user.type.status !== "Active") {
        return res.status(405).send({
          status: 405,
          message: "Your User Type is not Active",
        });
      }
      if (user.status !== "Active") {
        return res.status(401).send({
          status: 401,
          message: "Your signup request is not approved yet",
        });
      }
      // getting array of matching MID
      const get_match_mid = await getPopulatedData(
        "user",
        { mid: user.mid },
        "type",
        "type"
      );
      if (!get_match_mid.length) {
        return res
          .status(404)
          .send({ status: 404, message: "MID doesn't match" });
      }
      const checkManager = get_match_mid.filter(
        (element) => element.type.type === "Manager"
      );
      if (!checkManager.length) {
        return res.status(404).send({
          status: 404,
          message: "There is no Manager with Your MID",
        });
      }
      var token = jwt.sign({ id: user._id }, SECRET);
      return res.status(200).send({ status: 200, user, token });
    } else {
      return res
        .status(404)
        .send({ status: 404, message: "User does not exist!" });
    }
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = loginUser;
