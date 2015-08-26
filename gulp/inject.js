var gulp = require('gulp');
var path = require('path');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var conf = require('./conf');

gulp.task('inject', ['less', 'minify:js'], function () {
    return gulp.src(path.join(conf.devPath, 'index.html'))
        .pipe(wiredep(conf.wiredep))
        .pipe(inject(gulp.src(conf.cssFiles[1], {read: false}), conf.inject.css))
        .pipe(inject(gulp.src(conf.jsFiles[0], {read: false}), conf.inject.js))
        .pipe(gulp.dest(conf.devPath));
});
