const { Dropbox } = require("dropbox"); // eslint-disable-line import/no-unresolved
var dbx = new Dropbox({
  accessToken:
    "sl.BBSG9d68ycdljkaAvqcLTC6mLQCm_Lg15EXnGWhboVsZ-5YZeMuY5FWNsaURiAKNjleW7rHz0SLD14CAGSstE7sqxf5sQSA2zCgCRCdF2ZyVSAzr059MLFx_cf07AyHse6WO7iq0BX1H",
});

module.exports = { dbx };
