const { Dropbox } = require("dropbox"); // eslint-disable-line import/no-unresolved
var dbx = new Dropbox({
  accessToken:
    "sl.BBsoSQFDt7Z6f1OKmruOnyioEedMildH193aSHA_SKuITo6aS7jGVJjRXEp1pgpYkaCa8yOQoI3uCPnqba7Xbj01ShCv9efvHwgG11Yx2GVON0rmPX5yYkgU-XirRlIWnIZ1_DL_w8fI",
});

module.exports = { dbx };
