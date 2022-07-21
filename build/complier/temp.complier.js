const gulp = require("gulp")
const ejs = require("gulp-ejs")
const rename = require('gulp-rename')
function tempComplier(tempPath,data){
  return function(dist,{basename,extname}){

    return function tempComplie(){

      return gulp.src(tempPath)
      .pipe(ejs(data))
      .pipe(rename((path)=>{
        return {
          dirname: path.dirname,
          basename: basename,
          extname: extname
        }
    }))
      .pipe(gulp.dest(dist))
    }

  }
}

module.exports ={
  tempComplier
}
