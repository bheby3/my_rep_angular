var gulp = require('gulp')
  , concat = require('gulp-concat')
  , annotate = require('gulp-ng-annotate')
  , plumber = require('gulp-plumber')
  , uglify = require('gulp-uglify')
  , watch = require('gulp-watch')
  , sass = require('gulp-sass')
  , scss = require('gulp-scss')
  , fs = require('fs')
  , path = require('path');


var paths = {
  jsSource: ['./core/public/app/**/*.js'],
  sassSource: ['./core/public/styles/sass/*.scss']
};


gulp.task('js', function() {
  return gulp.src(paths.jsSource)
  .pipe(plumber())
  .pipe(concat('bundle.js'))
  .pipe(annotate())
  .pipe(gulp.dest('./core/public'));
});

gulp.task('scss', function () {
  return gulp.src(paths.sassSource)
    .pipe(sass({
      paths: paths.sassSource
    }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./core/public/styles'));
});

gulp.task('watch', function() {
  gulp.watch(paths.jsSource, ['js']);
  gulp.watch(paths.sassSource, ['scss']);
});

gulp.task('default', ['watch', 'js', 'scss']);
