"use strict";

var gulp = require("gulp");
var uglify = require("gulp-uglify");
var minHTML = require("gulp-minify-html");
var imgMin = require("gulp-imagemin");
var conf = require("../gulp.config");

gulp.task("minify:js", ["clean:js"], function () {
    return gulp.src(conf.jsFiles.app)
        .pipe(uglify())
        .pipe(gulp.dest(conf.jsDist));
});

gulp.task("minify:html", ["clean:html"], function () {
    return gulp.src(conf.htmlFiles)
        .pipe(minHTML())
        .pipe(gulp.dest(conf.distPath));
});

gulp.task("minify:img", ["clean:img"], function () {
    return gulp.src(conf.imgFiles)
        .pipe(imgMin({optimizationLevel: 4}))
        .pipe(gulp.dest(conf.imgDist));
});
