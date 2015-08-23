var gulp = require('gulp');
var jshint = require('gulp-jshint');
var path = require('path');
var conf = require('./conf');

gulp.task('lint', function (done) {
    gulp.src(conf.jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});