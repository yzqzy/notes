const { src, dest, parallel, series, watch } = require('gulp');

const del = require('del');
const browserSync = require('browser-sync');
const loadPlugins = require('gulp-load-plugins');

const data = require('./src/data');

const plugins = loadPlugins();
const bs = browserSync.create();

const clean = () => {
  return del(['dist']);
}

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest('dist'));
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('dist'));
}

const page = () => {
  return src('src/*.html', { base: 'src' })
    .pipe(plugins.swig({ data, defaults: { cache: false } }))
    .pipe(dest('dist'));
}

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'));
}

const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'));
}

const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'));
}

const serve = () => {
  watch('src/assets/styles/*.scss', style);
  watch('src/assets/scripts/*.js', script);
  watch('src/*.html', page);

  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ], bs.reload);

  bs.init({
    notify: false,
    port: 3000,
    // open: false,
    files: 'dist/**',
    
    server: {
      baseDir: [
        'dist',
        'src',
        'public'
      ],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  });
}

const compile = parallel(style, script, page);
const build = series(clean, parallel(compile, extra, image, font));
const dev = series(compile, serve);

module.exports = {
  build,
  dev
};