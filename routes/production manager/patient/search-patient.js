const Joi = require("joi");
const { findOne, getPopulatedData, find } = require("../../../helpers");
const schema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  gender: Joi.string(),
  pid: Joi.number(),
  name: Joi.string(),
  type: Joi.string(),
  location_name: Joi.string(),
});
const searchPatient = async (req, res) => {
  try {
    await schema.validateAsync(req.query);
    const { first_name, last_name, gender, pid, name, type, location_name } =
      req.query;
    let queryArr = [];
    const production_manager = await findOne("user", {
      _id: req.userId,
    });
    const { production_manager_location } = production_manager;
    if (first_name) {
      queryArr = await getPopulatedData(
        "patient",
        {
          location_id: { $in: production_manager_location },
          first_name: { $regex: first_name, $options: "i" },
          is_tested: "Yes",
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
          location_id: { $in: production_manager_location },
          last_name: { $regex: last_name, $options: "i" },
          is_tested: "Yes",
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
          location_id: { $in: production_manager_location },
          gender: {
            $regex: new RegExp("^" + gender.toLowerCase() + "$", "i"),
          },
          is_tested: "Yes",
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
          location_id: { $in: production_manager_location },
          pid,
          is_tested: "Yes",
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
          location_id: { $in: production_manager_location },
          "test_type.name": { $regex: name, $options: "i" },
          is_tested: "Yes",
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
          location_id: { $in: production_manager_location },
          "test_type.type": { $regex: type, $options: "i" },
          is_tested: "Yes",
        },
        "location_id",
        "location_name"
      );
      return res.status(200).send({ status: 200, queryArr });
    }
    if (location_name) {
      queryArr = await find("location", {
        _id: { $in: production_manager_location },
        location_name: { $regex: location_name, $options: "i" },
      });
      console.log(queryArr);
      const filterArrId = queryArr.map((item) => item._id);
      queryArr = await getPopulatedData(
        "patient",
        {
          location_id: { $in: filterArrId },
          is_tested: "Yes",
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
