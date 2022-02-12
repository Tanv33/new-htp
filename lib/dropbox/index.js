const { Dropbox } = require("dropbox"); // eslint-disable-line import/no-unresolved
var dbx = new Dropbox({
  accessToken:
    "sl.BB5iJ-9kq1JSjXXGpR8d0CwHiV33CnPqAE6ZQxYj0WEIFiaoRSu8312JSNYTwi1MJIhH2n20U3Ziolu0fUuIR8AXI78mDjybkudNz8wfKcapw800XKApsFq7gXlp1aK41owyoVKbpbwl",
});

module.exports = { dbx };
