'use strict';

var gulp = require('gulp');
var glob = require('glob-array');
var config = require('./gulp/conf');

/**
 * Load each gulp module from the gulp directory
 */
glob.sync(config.glob, config.globOptions).forEach(function (file) {
   require(file);
});

/**
 *  Declare default task, clean temporary files and build
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
