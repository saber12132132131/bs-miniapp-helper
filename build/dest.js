const gulp = require("gulp")
const path = require('path');
const { scssComplier,jsComplier } = require("./complier");
const {  miniprogramPath, copier, distPath } = require("./tools");


const wxmlCopier = copier('wxml')
const jsonCopier = copier("json")
const dist =   gulp.parallel(
  scssComplier(distPath),
  jsComplier(distPath),
  wxmlCopier(distPath),
  jsonCopier(distPath)
)

module.exports = {
  dist
}
