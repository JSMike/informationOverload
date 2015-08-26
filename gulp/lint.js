var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var path = require('path');
var conf = require('./conf');

gulp.task('lint', function () {
    gulp.src(conf.jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(jscs());
});
