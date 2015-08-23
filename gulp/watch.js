var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');

gulp.task('watch', function (done) {
    gulp.watch(conf.jsFiles, ['lint']);

    done;
});