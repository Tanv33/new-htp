const { Dropbox } = require("dropbox"); // eslint-disable-line import/no-unresolved
var dbx = new Dropbox({
  accessToken:
    "sl.BB4ed87l144W7cZZdQTqKRC3EtXoRvXFy04xE5XSSQaCHpOM11LX-L3YVlVV9SDE7jGEe7BxFl8l8OR7cRhtOxbrb3Zhb6BkbD3KZaFKO2KQzt-KuhzRgEPXtDdwXIb3yCWEKNbWV2Fm",
});

module.exports = { dbx };
