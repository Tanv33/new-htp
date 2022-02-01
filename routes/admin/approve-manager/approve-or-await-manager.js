const { updateDocument, findOne } = require("../../../helpers");
// const Joi = require("joi");
const { send_email } = require("../../../lib");

// const schema = Joi.object({
//   status: Joi.string().required(),
// });
const approveManager = async (req, res) => {
  try {
    // await schema.validateAsync(req.body);
    // const { status } = req.body;
    const manager = await updateDocument(
      "user",
      { _id: req.params.id },
      { status: "Active" }
    );
    const user = await findOne("user", { _id: req.params.id });
    if (user.status === "Active") {
      send_email(
        res,
        "employeeApprovedTemp",
        { username: user.full_name, manager_logo: user.manager_logo },
        "American Specialty Lab",
        "Account Approved Successfully",
        user.email
      );
    }
    return res.status(200).send({ status: 200, manager });
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = approveManager;
