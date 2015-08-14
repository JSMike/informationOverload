'use strict';

var gulp = require('gulp');
var glob = require('glob');

/**
 * Load each gulp module from the gulp directory
 */
glob.sync('gulp/*.js').forEach(funtion (file) {
   require(file);
});

/**
 *  Declare default task, clean temporary files and build
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
