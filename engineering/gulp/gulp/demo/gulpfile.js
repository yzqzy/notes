const { src, dest, parallel, series } = require('gulp');

const del = require('del');

const sass = require('gulp-sass');
const babel = require('gulp-babel');
const swig = require('gulp-swig');
const imagemin = require('gulp-imagemin');

const data = require('./src/data');

const clean = () => {
  return del(['dist']);
}

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(dest('dist'))
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('dist'));
}

const page = () => {
  return src('src/*.html', { base: 'src' })
    .pipe(swig({ data }))
    .pipe(dest('dist'));
}

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(imagemin())
    .pipe(dest('dist'))
}

const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(imagemin())
    .pipe(dest('dist'))
}

const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'));
}

const compile = parallel(style, script, page, image, font);

const build = series(clean, parallel(compile, extra));

module.exports = {
  build
};