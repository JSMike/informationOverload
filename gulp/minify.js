var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');
var uglify = require('gulp-uglify');
var minHTML = require('gulp-minify-html');

gulp.task('minify:js', function () {
    gulp.src(conf.jsFiles[0])
        .pipe(uglify())
        .pipe(gulp.dest(conf.jsDist));
});

gulp.task('minify:html', function () {
    gulp.src(conf.htmlFiles)
        .pipe(minHTML())
        .pipe(gulp.dest(conf.distPath));
});