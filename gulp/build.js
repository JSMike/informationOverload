'use strict';

var gulp = require('gulp');
var path = require('path');
var run = require('run-sequence');
var conf = require('./conf');

gulp.task('build', function (done) {
    run('inject',
        ['minify:js', 'minify:html', 'minify:img'],
        done);
});
