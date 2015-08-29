"use strict";

var gulp = require("gulp");
var jshint = require("gulp-jshint");
var jscs = require("gulp-jscs");
var stylish = require("gulp-jscs-stylish");
var path = require("path");
var conf = require("./conf");
var noop = function () {};

gulp.task("lint", function () {
    return gulp.src(conf.jsFiles)
        .pipe(jshint())
        .pipe(jscs())
        .on("error", noop)
        .pipe(stylish.combineWithHintResults())
        .pipe(jshint.reporter("jshint-stylish"));
});
