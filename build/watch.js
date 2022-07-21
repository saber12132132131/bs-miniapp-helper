const gulp = require("gulp")
const { scssComplier, jsComplier } = require("./complier");
const { miniprogramPath, copier, templatePath, miniappPath } = require("./tools");
const minimist = require('minimist');
const { tempComplier } = require("./complier/temp.complier");
const devDist = `${miniprogramPath}\\components`
const wxmlCopier = copier('wxml')
const jsonCopier = copier("json")
const obs = require("gulp-watch")
var knownOptions = {
  string: 'test',
  default: "empty"
};
var options = minimist(process.argv.slice(2), knownOptions);
const dejsonComplier = tempComplier(`${templatePath}\\demoJsonTemp.ejs`, { compName: options.test||'empty'})

const watch = gulp.parallel(
  dejsonComplier(`${miniprogramPath}\\pages\\demo`,{basename:'demo',extname:'.json'}),
  scssComplier(devDist),
  jsComplier(devDist),
  wxmlCopier(devDist),
  jsonCopier(devDist),
)
obs(`${templatePath}\\demoJsonTemp.ejs`,  dejsonComplier(`${miniprogramPath}\\pages\\demo`,{basename:'demo',extname:'.json'}))
obs(`${miniappPath}\\**\\*.scss`,scssComplier(devDist))
obs(`${miniappPath}\\**\\*.js`,jsComplier(devDist))
obs(`${miniappPath}\\**\\*.wxml`,wxmlCopier(devDist))
obs(`${miniappPath}\\**\\*.json`,jsonCopier(devDist))
module.exports = {
  watch
}