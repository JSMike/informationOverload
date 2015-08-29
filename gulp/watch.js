"use strict";

var gulp = require("gulp");
var run = require("run-sequence").use(gulp);
var path = require("path");
var conf = require("./conf");

gulp.task("watch", ["build"], function () {
    gulp.watch(conf.jsFiles, function (evt) {
        var tasks = ["lint"];
        if (evt in {"added":1, "deleted":1}) {
            tasks.push("inject");
        } else {
            tasks.push("minify:js");
        }
        run(tasks);
    });
    gulp.watch(conf.lessFiles, function (evt) {
        if (evt in {"added":1, "deleted":1}) {
            run("inject");
        } else {
            run("less");
        }
    });
    gulp.watch(conf.htmlFiles, ["minify:html"]);
    gulp.watch(conf.imgFiles, ["minify:img"]);
});
