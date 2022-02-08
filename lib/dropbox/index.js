const { Dropbox } = require("dropbox"); // eslint-disable-line import/no-unresolved
var dbx = new Dropbox({
  accessToken:
    "sl.BBqHIdBrQ22_QCimsRQEvsekp7NcKdGcAsiSvF4_4wnswcdhdvgK-p5MCMnwPCtUz40L3ZzcWj_rTGdUJSoz_RDw78rILWvFrUuTJHK0cMXYVzgzm3EReeAOF45Q7kRcgrpuOOZ10Q1v",
});

module.exports = { dbx };
