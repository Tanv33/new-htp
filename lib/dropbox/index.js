const { Dropbox } = require("dropbox"); // eslint-disable-line import/no-unresolved
var dbx = new Dropbox({
  accessToken:
    "sl.BBOQO8urZN5XtGVPMCwYr5TmR5ReEwqF4XLaMRlsbHwfCC6re-W4GFV0HsOLcMj_Lzqr72Ymf78Ep2iqzQR9YGzepsfCV6V_7s7aZer_NykUi7o4s-n1pl-qk3F26_NqDSuK9-ekD2HB",
});

module.exports = { dbx };
