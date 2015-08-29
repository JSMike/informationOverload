'use strict';

var gulp = require('gulp');
var clean = require('del');
var path = require('path');
var conf = require('./conf');

gulp.task('clean:css', function (done) {
    clean(conf.cssFiles, done);
});

gulp.task('clean:js', function (done) {
    clean(conf.jsFiles[0].replace('clientDev', 'clientDist'), done);
});

gulp.task('clean:html', function (done) {
    clean(conf.htmlFiles.replace('clientDev', 'clientDist'), done);
});

gulp.task('clean:img', function (done) {
    clean(conf.imgFiles.replace('clientDev', 'clientDist'), done);
});

gulp.task('clean:all', function (done) {
    clean(conf.distPath, done);
});
