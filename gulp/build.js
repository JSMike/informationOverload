"use strict";

var gulp = require("gulp");
var run = require("run-sequence");

gulp.task("build", function (done) {
    run("inject",
        ["minify:js", "minify:html", "minify:img"],
        done);
});
