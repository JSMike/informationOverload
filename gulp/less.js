"use strict";

var gulp = require("gulp");
var glob = require("glob-array");
var wiredep = require("wiredep").stream;
var _ = require("lodash");
var conf = require("./conf");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var prefix = require("gulp-autoprefixer");
var util = require("gulp-util");
var csso = require("gulp-csso");

gulp.task("less", ["clean:css"], function () {
    return gulp.src(conf.lessFiles)
        .pipe(less())
        .pipe(plumber())
        .pipe(prefix({browsers: "last 2 version"}))
        .pipe(gulp.dest(conf.cssDev))
        .pipe(csso())
        .pipe(gulp.dest(conf.cssDist));
});
