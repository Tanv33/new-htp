const { Dropbox } = require("dropbox"); // eslint-disable-line import/no-unresolved
var dbx = new Dropbox({
  accessToken:
    "sl.BB4W4-WJu8LCJX56mZhQXayKVn9yqZMSw5cBjzfS_l1lLTAW4WnJoBeIqQRaSdSUZXPdtw0G8Xe34GmS7-wBtanA0robm4_i1Wf4PJe42K9zFkN9wSsiei1clne_NiwCsfFxwnIsiH95",
});

module.exports = { dbx };
