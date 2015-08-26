var gulp = require('gulp');
var path = require('path');
var nodemon = require('gulp-nodemon');
var util = require('gulp-util');
var conf = require('./conf');

gulp.task('server', ['watch'], function () {
    return nodemon(conf.nodemon)
        .on('restart', function (files) {
            util.log(util.colors.green('nodemon restarted'));
            util.log(util.colors.gray('files changed:\n' + files));
        })
        .on('start', function () {
            util.log(util.colors.green('nodemon started'));
        })
        .on('crash', function (err) {
            util.log(util.colors.red('nodemon crashed:\n' + err));
        })
        .on('exit', function () {
            util.log(util.colors.magenta('nodemon exited cleanly'));
        });
});

