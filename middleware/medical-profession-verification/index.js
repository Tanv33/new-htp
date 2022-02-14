const { getPopulatedData } = require("../../helpers");

const mpVerification = async (req, res, next) => {
  try {
    const is_mp_user = await getPopulatedData(
      "user",
      { _id: req.userId },
      "type",
      "type"
    );
    if (is_mp_user[0].type.type !== "Medical Profession") {
      return res.status(400).send({
        status: 400,
        message: "Medical Profession can only perform patient CRUD",
      });
    }
    next();
  } catch (e) {
    console.log("Medical token verification Error", e.message);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = { mpVerification: mpVerification };
