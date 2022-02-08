const { Dropbox } = require("dropbox"); // eslint-disable-line import/no-unresolved
var dbx = new Dropbox({
  accessToken:
    "sl.BBop5n-LHinYWGUVrXKAZIq1G_RqbR0uPoA30oDQyt_0yo9HtllHGZac5soYvhfXUhuQk9GYIqrjLbEWcUB_XDj0M9cTl1Pt1s19G_c-W5kBnC-yfRA-hkA9oOi-P5Ed8ACbovMWzwL4",
});

module.exports = { dbx };
