
const gulp = require("gulp")
const { miniappPath } = require("../tools");

const babel = require('gulp-babel');

function jsComplier(dest) {
  const src = `${miniappPath}\\**\\*.js`

  return function jsComplie () {
    return gulp.src(src)
        // .pipe(babel())
        .pipe(gulp.dest(dest))
  }
}
module.exports= {
  jsComplier
}
