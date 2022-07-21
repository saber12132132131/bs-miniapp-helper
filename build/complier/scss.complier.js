const gulp = require("gulp")
const { miniappPath } = require("../tools")
const sass = require('gulp-sass')(require('sass'));
const minifyCss = require("gulp-clean-css");
const rename = require('gulp-rename')
const postcss = require('gulp-postcss');
function scssComplier (dist){
    const src = `${miniappPath}\\**\\*.scss`
    return function scssComplie(){
      return gulp.src(src)
          .pipe(sass({ style: 'expanded' }))
          .pipe(postcss())
          .pipe(rename((path)=>{
              return {
                dirname: path.dirname,
                basename: path.basename,
                extname: ".wxss"
              }
          }))
          .pipe(minifyCss())
          .pipe(gulp.dest(dist))
    }
}

module.exports= {
  scssComplier
}
