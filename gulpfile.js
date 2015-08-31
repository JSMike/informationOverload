"use strict";

var gulp = require("gulp");
var glob = require("glob-array");
var config = require("./gulp/conf");

/**
 * Set this path as the current working directory
 */
process.chdir(__dirname);

/**
 * Load each gulp module from the gulp directory
 */
glob.sync(config.gulpFiles, config.globOptions).forEach(function (file) {
   require(file);
});

/**
 * Declare default task
 * Server: Clean temporary files, and build, run server, watch for changes
 */
gulp.task("default", ["server"]);
