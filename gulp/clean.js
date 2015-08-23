var gulp = require('gulp');
var clean = require('del');
var path = require('path');
var conf = require('./conf');

gulp.task('clean:css', function (done) {
    clean(conf.cssFiles.replace('clientDev', 'clientDist'), done);
});

gulp.task('clean:js', function (done) {
    clean(conf.jsFiles[0].replace('clientDev','clientDist'), done);
});

gulp.task('clean:html', function (done) {
    clean(conf.htmlFiles.map(function (v, i, a) { a[i].replace('clientDev', 'clientDist')}), 'css', done);
});

gulp.task('clean:all', function (done) {
    clean(conf.distPath, done);
});