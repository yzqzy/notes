const { src, dest } = require('gulp');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');

exports.default = () => {
  return src('src/*.css')
    .pipe(cleanCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('dist'));
}