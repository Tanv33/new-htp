const Joi = require("joi");
const fs = require("fs");
const {
  insertNewDocument,
  findOne,
  helperFunctionForQrCode,
  getPopulatedData,
} = require("../../helpers");
const { send_email, dbx } = require("../../lib");
const { NumberGeneratorModel } = require("../../models");
// PDf stuff
var pdf = require("html-pdf");
const signatureHtml = require("../../public/pdf/Singnature");
const consentHtml = require("../../public/pdf/tetindConsent");

const addPatient = async (req, res) => {
  try {
    // searching mp by id and after that getting all user with same mid and searching manager. If manager found then check reuired fileds if it's exist so required it in joi and if there is no lab created so return text with "No Lab created"
    const medicalProfession = await getPopulatedData(
      "user",
      { _id: req.userId },
      "employee_location"
    );
    const { employee_location } = medicalProfession[0];
    const { patient_required_fields } = employee_location;
    // creating an empty object and looping values from manager required fields and inserting keys which are required values and keys values are Joi.required()
    let obj = {};
    patient_required_fields.map((field) => {
      obj[field] = Joi.required();
    });
    console.log(obj);
    console.log({ patient_required_fields });
    const schema = Joi.object(obj);
    await schema.validateAsync(req.body);
    // After validation
    const { test_type, tested_by, full_name } = req.body;
    const check_test_type_exist = await findOne("testType", {
      type: test_type,
    });
    if (!check_test_type_exist) {
      return res
        .status(404)
        .send({ status: 404, message: "Test Type not exist!" });
    }
    const check_tested_user_exist = await findOne("user", {
      username: tested_by,
    });
    if (!check_tested_user_exist) {
      return res
        .status(404)
        .send({ status: 404, message: "Tested User not exist!" });
    }
    // See Down PDF stuff
    // Signature
    function randomNumberGenerator(min, max) {
      return Math.random() * (max - min) + min;
    }
    let getSignatureImage = fs.readFileSync(
      req.files.signature[0].path,
      (err, data) => {
        if (err) {
          return res
            .status(400)
            .send({ status: 400, message: "Error in reading Signature File" });
        }
        getSignatureImage = data;
      }
    );
    // console.log(getSignatureImage);  // Buffer
    const getSignaturePdf = async () => {
      return new Promise((resolve, reject) => {
        pdf
          .create(signatureHtml(getSignatureImage, req.body), {
            format: "Letter",
          })
          .toFile(
            `./public/signature pdf/signature${randomNumberGenerator(
              11111,
              99999
            ).toFixed(0)}.pdf`,
            (err, data) => {
              if (err) {
                // return res
                //   .status(400)
                //   .send({ status: 400, message: "Error in Generating PDF" });
                reject("error");
              }
              // console.log(data);
              resolve(data);
            }
          );
      });
    };
    let signaturePdfPath = await getSignaturePdf();
    const signaturePdfUrl = await dbx.filesUpload({
      path:
        "/signature pdf/" +
        `signature-${randomNumberGenerator(11111, 99999).toFixed(0)}.pdf`,
      contents: fs.readFileSync(signaturePdfPath.filename),
    });
    if (!signaturePdfUrl) {
      return res
        .status(400)
        .send({ status: 400, message: "Error in uploading Signature Pdf" });
    }
    const signatureSharedLink = await dbx.sharingCreateSharedLinkWithSettings({
      path: signaturePdfUrl.result.path_display,
      settings: {
        requested_visibility: "public",
        audience: "public",
        access: "viewer",
      },
    });
    if (!signatureSharedLink) {
      return res.status(400).send({
        status: 400,
        message: "Error in getting shared link of Signature Pdf",
      });
    }
    // Consent

    // console.log(getSignatureImage);  // Buffer
    const getConsentPdf = async () => {
      return new Promise((resolve, reject) => {
        pdf
          .create(consentHtml(getSignatureImage, req.body), {
            format: "Letter",
          })
          .toFile(
            `./public/consent pdf/consent${randomNumberGenerator(
              11111,
              99999
            ).toFixed(0)}.pdf`,
            (err, data) => {
              if (err) {
                // return res
                //   .status(400)
                //   .send({ status: 400, message: "Error in Generating PDF" });
                reject("error");
              }
              // console.log(data);
              resolve(data);
            }
          );
      });
    };
    let consentPdfPath = await getConsentPdf();
    const consentPdfUrl = await dbx.filesUpload({
      path:
        "/consent pdf/" +
        `consent-${randomNumberGenerator(11111, 99999).toFixed(0)}.pdf`,
      contents: fs.readFileSync(consentPdfPath.filename),
    });
    if (!consentPdfUrl) {
      return res
        .status(400)
        .send({ status: 400, message: "Error in uploading Consent Pdf" });
    }
    const consentSharedLink = await dbx.sharingCreateSharedLinkWithSettings({
      path: consentPdfUrl.result.path_display,
      settings: {
        requested_visibility: "public",
        audience: "public",
        access: "viewer",
      },
    });
    if (!consentSharedLink) {
      return res.status(400).send({
        status: 400,
        message: "Error in getting shared link of Consent Pdf",
      });
    }

    // Qrcode stuff
    const dateFormat = () => {
      let date = new Date();
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = `0${month}`;
      }
      let day = date.getDate();
      if (day < 10) {
        day = `0${day}`;
      }

      //	date.setDate(date.getDate()+adds)
      return `${date.getFullYear()}${month}${day}`;
      //	return Math.ceil(date.getTime()/1000)
    };
    // get pid auto generated
    const numberDoc = await NumberGeneratorModel.findOneAndUpdate(
      { name: "pid" },
      { $inc: { value: 1 } },
      { new: true }
    );
    const value = numberDoc.value;
    const sequenceNumber = (value + "").padStart(4, "0");
    const pid = dateFormat() + sequenceNumber;
    await helperFunctionForQrCode(pid);
    const fileUpload = await dbx.filesUpload({
      path: "/" + pid + ".png",
      contents: fs.readFileSync(`./public/qrcodes/${pid}.png`),
    });
    if (!fileUpload) {
      return res
        .status(400)
        .send({ status: 400, message: "Error in uploading file" });
    }
    const sharedLink = await dbx.sharingCreateSharedLinkWithSettings({
      path: fileUpload.result.path_display,
      settings: {
        requested_visibility: "public",
        audience: "public",
        access: "viewer",
      },
    });
    if (!sharedLink) {
      return res
        .status(400)
        .send({ status: 400, message: "Error in getting shared link" });
    }
    req.body.signature = signatureSharedLink.result.url?.replace(
      /dl=0$/,
      "raw=1"
    );
    req.body.consent_link = consentSharedLink.result.url?.replace(
      /dl=0$/,
      "raw=1"
    );
    req.body.pid = pid;
    req.body.pid_link = sharedLink.result.url?.replace(/dl=0$/, "raw=1");
    req.body.test_type = check_test_type_exist._id;
    req.body.tested_by = check_tested_user_exist._id;
    req.body.created_by = req.userId;
    const patient_created = await insertNewDocument("patient", req.body);

    if (test_type === "Rapid Antigen") {
      send_email(
        res,
        "AllTestsApplicationEmail",
        {
          username: full_name,
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
          username: full_name,
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
    // console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = addPatient;
