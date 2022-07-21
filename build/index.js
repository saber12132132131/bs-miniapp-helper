const { add } = require("./add.js");
const { dist } = require("./dest.js");
const { dev } = require("./dev.js");
const { watch } = require("./watch.js");

module.exports = {
  dev,
  dist,
  watch,
  add
}
