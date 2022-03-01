const Joi = require("joi");
const { findOne, getPopulatedData, find } = require("../../../helpers");
const schema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  gender: Joi.string(),
  pid: Joi.number(),
  is_tested: Joi.string(),
  name: Joi.string(),
  type: Joi.string(),
  location_name: Joi.string(),
});
const searchPatient = async (req, res) => {
  try {
    await schema.validateAsync(req.query);
    const {
      first_name,
      last_name,
      gender,
      pid,
      is_tested,
      name,
      type,
      location_name,
    } = req.query;
    let queryArr = [];
    const manager = await findOne("user", {
      _id: req.userId,
    });
    const { manager_location } = manager;
    if (first_name) {
      queryArr = await getPopulatedData(
        "patient",
        {
          location_id: { $in: manager_location },
          first_name: { $regex: first_name, $options: "i" },
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, queryArr });
    }
    if (last_name) {
      queryArr = await getPopulatedData(
        "patient",
        {
          location_id: { $in: manager_location },
          last_name: { $regex: last_name, $options: "i" },
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, queryArr });
    }
    if (gender) {
      queryArr = await getPopulatedData(
        "patient",
        {
          location_id: { $in: manager_location },
          gender: { $regex: gender, $options: "i" },
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, queryArr });
    }
    if (pid) {
      queryArr = await getPopulatedData(
        "patient",
        {
          location_id: { $in: manager_location },
          pid,
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, queryArr });
    }
    if (is_tested === "Yes") {
      queryArr = await getPopulatedData(
        "patient",
        {
          location_id: { $in: manager_location },
          is_tested,
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, queryArr });
    }
    if (is_tested === "No") {
      queryArr = await getPopulatedData(
        "patient",
        {
          location_id: { $in: manager_location },
          is_tested,
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, queryArr });
    }
    if (name) {
      queryArr = await getPopulatedData(
        "patient",
        {
          location_id: { $in: manager_location },
          "test_type.name": { $regex: name, $options: "i" },
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, queryArr });
    }
    if (type) {
      queryArr = await getPopulatedData(
        "patient",
        {
          location_id: { $in: manager_location },
          "test_type.type": { $regex: type, $options: "i" },
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, queryArr });
    }
    if (location_name) {
      queryArr = await find("location", {
        _id: { $in: manager_location },
        location_name: { $regex: location_name, $options: "i" },
      });
      console.log(queryArr);
      const filterArrId = queryArr.map((item) => item._id);
      queryArr = await getPopulatedData(
        "patient",
        {
          location_id: { $in: filterArrId },
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, queryArr });
    }
    return res
      .status(400)
      .send({ status: 400, message: "Enter a correct query key and value" });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = searchPatient;
