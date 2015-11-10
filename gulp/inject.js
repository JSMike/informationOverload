"use strict";

var gulp = require("gulp");
var path = require("path");
var wiredep = require("wiredep").stream;
var inject = require("gulp-inject");
var series = require("stream-series");
var conf = require("../gulp.config");
var app = gulp.src(conf.inject.app, {read: false});
var other = gulp.src(conf.inject.other, {read: false});

gulp.task("inject", ["less"], function () {
    return gulp.src(path.join(conf.devPath, "hhawSite.html"))
        .pipe(wiredep(conf.wiredep))
        .pipe(inject(gulp.src(conf.inject.cssFiles, {read: false}), conf.inject.css))
        .pipe(inject(series(app, other), conf.inject.js))
        .pipe(gulp.dest(conf.devPath));
});
