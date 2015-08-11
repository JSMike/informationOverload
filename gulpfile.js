'use strict';

var gulp = require('gulp');
var wrench = require('wrench');

/**
 * Load each gulp module from the gulp directory
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


/**
 *  Declare default task, clean temporary files and build
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
