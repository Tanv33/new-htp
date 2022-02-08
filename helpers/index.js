const Models = require("../models");
const QRCode = require("qrcode");
const { dbx } = require("../lib");
const fs = require("fs");
var atob = require("atob");

const find = async (modelDb, queryObj) =>
  await Models[modelDb].find(queryObj).exec();
const findOne = async (modelDb, queryObj) =>
  await Models[modelDb].findOne(queryObj).exec();
const searchDocuments = async (modelDb, queryObj) =>
  await Models[modelDb].find(queryObj).exec();
const updateDocument = async (modelDb, updateQuery, setQuery) => {
  return Models[modelDb].updateOne(updateQuery, { $set: setQuery });
};
const findOneSort = async (modelDb, queryObj) =>
  await Models[modelDb]?.findOne(queryObj).sort({ _id: -1 }).exec();

const insertNewDocument = async (modelDb, storeObj) => {
  let data = new Models[modelDb](storeObj);
  return await data.save();
};

const getPopulatedData = async (
  modelDb,
  searchQuery,
  populateQuery,
  selectQuery
) =>
  await Models[modelDb]
    .find(searchQuery)
    .populate({ path: populateQuery, select: selectQuery });

const getFindSelectPopulateData = async (
  modelDb,
  searchQuery,
  selectOnFind,
  populateQuery,
  selectQuery
) =>
  await Models[modelDb]
    .find(searchQuery)
    .select(selectOnFind)
    .populate({ path: populateQuery, select: selectQuery });

const getPopulated = async (modelDb, prevDocRef, populateQuery) =>
  await Models[modelDb].populate(prevDocRef, populateQuery);

const getAggregate = async (modelDb, aggregateQuery) =>
  await Models[modelDb].aggregate(aggregateQuery);

const deleteDocument = async (modelDb, deleteQuery) =>
  await Models[modelDb].deleteOne(deleteQuery);

const pushIfNotExists = async (modelDb, searchQuery, pushQuery) =>
  await Models[modelDb].update(searchQuery, { $addToSet: pushQuery });

const helperFunctionForQrCode = async (pid) => {
  return await QRCode.toFile(`./public/qrcodes/${pid}.png`, pid);
  // return new Promise((resolve, reject) => {
  //   QRCode.toFile(`./public/qrcodes/${pid}.png`, pid, (err, url) => {
  //     if (err) {
  //       reject("error");
  //     }
  //     console.log(err);
  //     resolve(url);
  //   });
  // });
};

// Dropbox
const getDropBoxLink = async (dropBoxPath, filePath, arrayBuffer) => {
  var newPath;
  if (arrayBuffer) {
    newPath = filePath;
  } else {
    newPath = fs.readFileSync(filePath);
  }
  const fileUpload = await dbx.filesUpload({
    path: dropBoxPath,
    contents: newPath,
  });
  const sharedLink = await dbx.sharingCreateSharedLinkWithSettings({
    path: fileUpload.result.path_display,
    settings: {
      requested_visibility: "public",
      audience: "public",
      access: "viewer",
    },
  });
  return sharedLink.result.url?.replace(/dl=0$/, "raw=1");
};

// Base64 To array Buffer
function _base64ToArrayBuffer(base64) {
  var binary_string = atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

const generateRandomNumber = (min, max) => Math.random() * (max - min) + min;

module.exports = {
  getPopulated,
  searchDocuments,
  updateDocument,
  insertNewDocument,
  deleteDocument,
  getPopulatedData,
  getAggregate,
  findOne,
  find,
  pushIfNotExists,
  findOneSort,
  helperFunctionForQrCode,
  getDropBoxLink,
  generateRandomNumber,
  getFindSelectPopulateData,
  _base64ToArrayBuffer,
};
