const gulp = require("gulp")
const path = require('path');
const { scssComplier, jsComplier } = require("./complier");
const { miniprogramPath, copier, templatePath } = require("./tools");
const minimist = require('minimist');
const { tempComplier } = require("./complier/temp.complier");
const devDist = `${miniprogramPath}\\components`
const wxmlCopier = copier('wxml')
const jsonCopier = copier("json")
var knownOptions = {
  string: 'test',
  default: "empty"
};
var options = minimist(process.argv.slice(2), knownOptions);
const dejsonComplier = tempComplier(`${templatePath}\\demoJsonTemp.ejs`, { compName: options.test||'empty'})

const dev = gulp.parallel(
  dejsonComplier(`${miniprogramPath}\\pages\\demo`,{basename:'demo',extname:'.json'}),
  scssComplier(devDist),
  jsComplier(devDist),
  wxmlCopier(devDist),
  jsonCopier(devDist)
)

module.exports = {
  dev
}
