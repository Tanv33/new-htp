const express = require("express");
const getLocation = require("./get-location");
const router = express.Router();
const Joi = require("joi");
const { findOne } = require("../../helpers");


router.get("/get-location", getLocation);
router.get("/get-patient",async (req, res) => {
  try {
    const { first_name , last_name , date_of_birth ,pid } = req.query;
    if (!first_name || !last_name || !date_of_birth || !pid ) {
      return res
        .status(404)
        .send({ status: 404, message: "first_name , last-name , date_of_birth and pid is required" });
    }
    const patient = await findOne("patient", {first_name , last_name , date_of_birth ,pid});
    if (!patient) {
      return res
        .status(404)
        .send({ status: 404, message: "No Patient Found" });
    }
    return res.status(200).send({ status: 200, patient });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
});


module.exports = router;
