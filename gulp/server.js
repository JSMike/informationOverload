var gulp = require('gulp');
var path = require('path');
var nodemon = require('gulp-nodemon');
var chalk = require('chalk');
var conf = require('./conf');

gulp.task('server', ['less', 'minify:js', 'minify:html', 'minify:img'], function () {
    nodemon(conf.nodemon)
        .on('restart', function(files) {
            log(chalk.yellow('nodemon restarted'));
            log(chalk.blue('files changed:\n' + files));
        })
        .on('start', function () {
            log(chalk.green('nodemon started'));
        })
        .on('crash', function (err) {
            log(chalk.red('nodemon crashed:\n' + err));
        })
        .on('exit', function () {
            log(chalk.purple('nodemon exited cleanly'));
        });
    gulp.start('watch');
});