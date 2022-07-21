const gulp = require("gulp")

const { miniprogramPath, copier, templatePath, miniappPath } = require("./tools");
const minimist = require('minimist');
const { tempComplier } = require("./complier/temp.complier");
const { dev } = require("./dev")

var knownOptions = {
  string: 'comp',
  default: "index"
};
var options = minimist(process.argv.slice(2), knownOptions);
const dejsonComplier = tempComplier(`${templatePath}\\demoJsonTemp.ejs`, { compName: options.comp||'index'})
const indexJSComplier = tempComplier(`${templatePath}\\indexJsTemp.ejs`, { compName: options.comp||'index'})
const indexJsonComplier = tempComplier(`${templatePath}\\indexJsonTemp.ejs`, { compName: options.comp||'index'})
const indexWxmlComplier = tempComplier(`${templatePath}\\indexWxmlTemp.ejs`, { compName: options.comp||'index'})
const indexWxssComplier = tempComplier(`${templatePath}\\indexWxssTemp.ejs`, { compName: options.comp||'index'})
const addTemp = gulp.parallel(
  indexJSComplier(`${miniappPath}\\${options.comp}`,{basename:'index',extname:'.js'}),
  indexJsonComplier(`${miniappPath}\\${options.comp}`,{basename:'index',extname:'.json'}),
  indexWxmlComplier(`${miniappPath}\\${options.comp}`,{basename:'index',extname:'.wxml'}),
  indexWxssComplier(`${miniappPath}\\${options.comp}`,{basename:'index',extname:'.scss'}),
)

const add = gulp.series(addTemp,dev,dejsonComplier(`${miniprogramPath}\\pages\\demo`,{basename:'demo',extname:'.json'}))
module.exports ={
  add
}