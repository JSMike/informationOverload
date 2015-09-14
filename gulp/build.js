"use strict";

var gulp = require("gulp");
var run = require("run-sequence");

gulp.task("build", function (done) {
    run(["lint", "htmlhint"],
        "inject",
        ["minify:js", "minify:html", "minify:img"],
        done);
});
