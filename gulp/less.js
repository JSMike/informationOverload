"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var prefix = require("gulp-autoprefixer");
var csso = require("gulp-csso");
var conf = require("../gulp.config");

gulp.task("less", ["clean:css"], function () {
    return gulp.src(conf.lessFiles)
        .pipe(less())
        .pipe(plumber())
        .pipe(prefix({browsers: "last 2 version"}))
        .pipe(gulp.dest(conf.cssDev))
        .pipe(csso())
        .pipe(gulp.dest(conf.cssDist));
});
