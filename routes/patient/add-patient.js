const Joi = require("joi");
const {
  insertNewDocument,
  findOne,
  helperFunctionForQrCode,
  getPopulatedData,
  getDropBoxLink,
  _base64ToArrayBuffer,
  generatePdf,
  generateRandomNumber,
  base64regex,
  dateFormat,
  findOneAndUpdate,
} = require("../../helpers");
const { send_email } = require("../../lib");
const signatureHtml = require("../../public/pdf/Singnature");
const consentHtml = require("../../public/pdf/tetindConsent");

const addPatient = async (req, res) => {
  try {
    const user = await findOne("user", { _id: req.userId });
    const medicalProfession = await getPopulatedData(
      "user",
      { _id: req.userId },
      "employee_location"
    );
    console.log(medicalProfession);
    if (!medicalProfession.length) {
      return res.status(400).send({
        status: 400,
        message: "There is no location created by your manager",
      });
    }
    const { employee_location } = medicalProfession[0];
    const { patient_required_fields } = employee_location;
    // creating an empty object and looping values from manager required fields and inserting keys which are required values and keys values are Joi.required()
    let obj = {};
    // Array
    // console.log({ patient_required_fields });
    patient_required_fields.map((item) => {
      if (item?.required) {
        obj[item] = Joi.string().required();
      } else {
        obj[item] = Joi.string();
      }
    });
    //  Object
    // for (const key in patient_required_fields) {
    //   // console.log(key.required);
    //   if (patient_required_fields[key].required) {
    //     obj[key] = Joi.required();
    //   }
    // }
    // obj.patient_signature = Joi.required();
    // console.log(obj);
    const schema = Joi.object(obj);
    await schema.validateAsync(req.body);
    const {
      gender,
      pregnant,
      payment,
      insurance_name,
      insurance_policy_number,
      us_id,
      us_id_no,
      ssn,
    } = req.body;
    if (gender === "Female") {
      if (!pregnant) {
        return res
          .status(400)
          .send({ status: 400, message: "Pregnant field required" });
      }
    }
    if (payment === "Insurance") {
      if (
        !insurance_name &&
        !insurance_policy_number &&
        !req.files.insurance_image[0]
      ) {
        return res.status(400).send({
          status: 400,
          message:
            "All Insurance field required like insurance_name, insurance_policy_number, insurance_image",
        });
      }
    }
    if (us_id === "Yes") {
      if (!us_id_no) {
        return res.status(400).send({
          status: 400,
          message: "Us Id Number required",
        });
      }
    }

    if (us_id === "No") {
      if (!ssn) {
        return res.status(400).send({
          status: 400,
          message: "SSN required",
        });
      }
    }
    // After validation
    const { test_type, first_name } = req.body;
    const check_test_type_exist = await findOne("testType", {
      name: test_type.name,
      types: test_type.type,
    });
    if (!check_test_type_exist) {
      return res
        .status(404)
        .send({ status: 404, message: "Test Type not exist!" });
    }
    // const check_tested_user_exist = await findOne("user", {
    //   username: tested_by,
    // });
    // if (!check_tested_user_exist) {
    //   return res
    //     .status(404)
    //     .send({ status: 404, message: "Tested User not exist!" });
    // }
    // Signature required
    if (!req.body.patient_signature) {
      return res.status(400).send({
        status: 400,
        message: "Patient Signature is required (patient_signature)",
      });
    }
    if (!base64regex.test(req.body.patient_signature)) {
      return res.status(400).send({
        status: 400,
        message: "Manager Signature should be in base64",
      });
    }
    // Signature
    // patient_signature sending to Dropbox
    const patientSignatureLink = await getDropBoxLink(
      "/patient signature/" +
        `patient-signature-${generateRandomNumber(11111, 99999).toFixed(
          0
        )}.png`,
      _base64ToArrayBuffer(
        req.body.patient_signature.replace(/^data:image\/[a-z]+;base64,/, "")
      ),
      true
    );
    // generating PDF of signature HTML
    const signaturePdfPath = await generatePdf(
      signatureHtml(req.body.patient_signature, req.body),
      `./public/signature pdf/signature${generateRandomNumber(
        11111,
        99999
      ).toFixed(0)}.pdf`
    );
    // getting signaturepdf URL from Dropbox
    const signaturePdfLink = await getDropBoxLink(
      "/signature pdf/" +
        `signature-${generateRandomNumber(11111, 99999).toFixed(0)}.pdf`,
      signaturePdfPath.filename,
      false
    );

    // Consent
    // console.log(getSignatureImage);  // Buffer
    const consentPdfPath = await generatePdf(
      consentHtml(req.body.patient_signature, req.body),
      `./public/consent pdf/consent${generateRandomNumber(11111, 99999).toFixed(
        0
      )}.pdf`
    );
    const consentPdfLink = await getDropBoxLink(
      "/consent pdf/" +
        `consent-${generateRandomNumber(11111, 99999).toFixed(0)}.pdf`,
      consentPdfPath.filename,
      false
    );

    // Qrcode stuff
    // get pid auto generated
    const numberDoc = await findOneAndUpdate(
      "NumberGeneratorModel",
      { name: "pid" },
      { $inc: { value: 1 } },
      { new: true }
    );
    const value = numberDoc.value;
    const sequenceNumber = (value + "").padStart(4, "0");
    const pid = dateFormat() + sequenceNumber;
    await helperFunctionForQrCode(pid);
    const qrcodeLink = await getDropBoxLink(
      "/qrcode/" + pid + ".png",
      `./public/qrcodes/${pid}.png`,
      false
    );
    req.body.location_id = user.employee_location;
    req.body.created_by = req.userId;
    req.body.patient_signature = patientSignatureLink;
    req.body.signature = signaturePdfLink;
    req.body.consent_link = consentPdfLink;
    req.body.pid = pid;
    req.body.pid_link = qrcodeLink;
    req.body.test_type = test_type;
    // req.body.tested_by = check_tested_user_exist._id;
    const patient_created = await insertNewDocument("patient", req.body);

    if (test_type === "Rapid Antigen") {
      send_email(
        res,
        "AllTestsApplicationEmail",
        {
          username: first_name,
          test_type: test_type,
          time: "15 to 20 minutes",
          qrcodelink: req.body.pid_link,
        },
        "American Specialty Lab",
        "Patient Account Created",
        req.body.email,
        [
          {
            filename: "qrcode.png",
            path: `./public/qrcodes/${pid}.png`, // Path of barcode img
          },
          {
            filename: "signature.pdf",
            path: signaturePdfPath.filename, // Path of signature file
          },
          {
            filename: "consent.pdf",
            path: consentPdfPath.filename, // Path of signature file
          },
        ]
      );
    } else {
      send_email(
        res,
        "AllTestsApplicationEmail",
        {
          username: first_name,
          test_type: test_type,
          time: "24 hours or less",
          qrcodelink: req.body.pid_link,
        },
        "American Specialty Lab",
        "Patient Account Created",
        req.body.email,
        [
          {
            filename: "qrcode.png",
            path: `./public/qrcodes/${pid}.png`, // Path of barcode img
          },
          {
            filename: "signature.pdf",
            path: signaturePdfPath.filename, // Path of signature file
          },
          {
            filename: "consent.pdf",
            path: consentPdfPath.filename, // Path of signature file
          },
        ]
      );
      // fs.unlinkSync(`./public/qrcodes/${pid}.png`);
    }
    return res.status(200).send({ status: 200, patient_created });
  } catch (e) {
    // req?.files.map((file) => {
    //   fs.unlinkSync(file.path);
    // });
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = addPatient;
