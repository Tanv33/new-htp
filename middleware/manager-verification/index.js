const { getPopulatedData } = require("../../helpers");

const managerVerification = async (req, res, next) => {
  const is_manager_user = await getPopulatedData(
    "user",
    { _id: req.userId },
    "type",
    "type"
  );
  if (is_manager_user[0].type.type !== "Manager") {
    return res.status(400).send({
      status: 400,
      message: "Manager can only Approve Employee",
    });
  }
  next();
};

module.exports = { managerVerification: managerVerification };
