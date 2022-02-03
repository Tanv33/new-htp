const { Dropbox } = require("dropbox"); // eslint-disable-line import/no-unresolved
var dbx = new Dropbox({
  accessToken:
    "sl.BBV04miQnKbIqdDhqaAwzm0vA5xfOfj0qM2Kw5cJc0M6II_NVdvazCt8nyAVFNiP5iuN5i9ZK4OzEi0tptZ_6w2ZulycPhCW4d9HFFlCFIknqKB-DLxMSOfcQhJJ9uLQl-Ax6BxF8Hgm",
});

module.exports = { dbx };
