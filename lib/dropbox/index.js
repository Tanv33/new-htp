const { Dropbox } = require("dropbox"); // eslint-disable-line import/no-unresolved
var dbx = new Dropbox({
  accessToken:
    "sl.BBzsRRgqvtvpLhhKTCesIhd4FmKM050MfjBXJQwXmc1KcWT8cjmv7NhbjCPnfgRVIMI9_IQGWC0eJMaVPMHdegVBappDUYRtu0JQCsP77aSZOW-Ixj8H7OYqTYjpLXymJ1jjOspRwk0A",
});

module.exports = { dbx };
