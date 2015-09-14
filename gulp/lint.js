"use strict";

var gulp = require("gulp");
var util = require("gulp-util");
var jshint = require("gulp-jshint");
var jscs = require("gulp-jscs");
var stylish = require("gulp-jscs-stylish");
var htmlhint = require("gulp-htmlhint");
var conf = require("../gulp.config");

gulp.task("lint", function () {
    return gulp.src(conf.jsFiles.watch)
        .pipe(jshint())
        .pipe(jscs())
        .on("error", util.noop)
        .pipe(stylish.combineWithHintResults())
        .pipe(jshint.reporter("jshint-stylish"))
        .pipe(jshint.reporter("fail"));
});

gulp.task("htmlhint", function () {
    return gulp.src(conf.htmlFiles)
        .pipe(htmlhint(conf.htmlhintoptions))
        .pipe(htmlhint.reporter());
});
