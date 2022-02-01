const { getPopulatedData } = require("../../helpers");

const adminVerification = async (req, res, next) => {
  const is_admin_user = await getPopulatedData(
    "user",
    { _id: req.userId },
    "type",
    "type"
  );
  if (is_admin_user[0].type.type !== "Asins") {
    return res.status(400).send({
      status: 400,
      message: "Admin can only Approve Manager",
    });
  }
  next();
};

module.exports = { adminVerification: adminVerification };
