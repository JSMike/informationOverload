"use strict";

var gulp = require("gulp");
var uglify = require("gulp-uglify");
var minHTML = require("gulp-minify-html");
var imgMin = require("gulp-imagemin");
var concat = require("gulp-concat");
var ngAnnotate = require("gulp-ng-annotate");
var sourcemaps = require("gulp-sourcemaps");
var conf = require("../gulp.config");

gulp.task("minify:js", ["clean:js"], function () {
    return gulp.src(conf.jsFiles.app)
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(conf.jsDist));
});

gulp.task("minify:html", ["clean:html"], function () {
    return gulp.src(conf.htmlFiles)
        .pipe(minHTML())
        .pipe(gulp.dest(conf.distPath));
});

gulp.task("minify:img", ["clean:img"], function () {
    return gulp.src(conf.imgFiles)
        .pipe(imgMin({ optimizationLevel: 4 }))
        .pipe(gulp.dest(conf.imgDist));
});
