#!/usr/bin/env node
var gulp = require("gulp");
var task = process.argv.splice(2, Number.MAX_VALUE);

task = task.length > 0 ? task[0] : "default";
gulp.start(task);