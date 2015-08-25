var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');

gulp.task('build', ['less', 'minify:js', 'minify:html', 'minify:img']);