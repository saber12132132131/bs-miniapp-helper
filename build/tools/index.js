const util = require('util');
const path = require('path');
const gulp = require("gulp")
const exec = util.promisify(require('child_process').exec);
const resolve = (abPath) => path.resolve(__dirname, abPath)
const cleaner = (path) => function clean() { return exec(`npx rimraf ${path}`); };
const libPath = resolve("../../lib")
const miniprogramPath = resolve("../../miniprogram")
const miniappPath = resolve("../../lib/@miniapp")
const distPath = resolve("../../dist/@miniapp")
const templatePath = resolve("../../template")
// const copier = (dist,ext) =>
//   function copy() {
//     const src = `${miniappPath}\\**\\*.${ext}`
//     return gulp
//       .src(src)
//       .pipe(gulp.dest(dist));
//   };
const copier = function (ext) {
  return function (dist) {
    return function copier() {

      const src = `${miniappPath}\\**\\*.${ext}`
      return gulp
        .src(src)
        .pipe(gulp.dest(dist));
    }
  }
}


module.exports = {
  resolve,
  cleaner,
  copier,
  libPath,
  miniprogramPath,
  miniappPath,
  distPath,
  templatePath
}
