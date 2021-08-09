const { src, dest } = require('gulp');
const sass = require('gulp-sass');


const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(dest('dist'))
}

module.exports = {
  style
}