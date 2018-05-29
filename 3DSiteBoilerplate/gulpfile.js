var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-cssmin');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
    gulp.src('src/**/*.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});
gulp.task('css', function () {
    gulp.src('src/**/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});


