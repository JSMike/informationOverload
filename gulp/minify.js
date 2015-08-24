var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');
var uglify = require('gulp-uglify');
var minHTML = require('gulp-minify-html');
var imgMin = require('gulp-imagemin');

gulp.task('minify:js', function () {
    gulp.src(conf.jsFiles[0])
        .pipe(uglify())
        .pipe(gulp.dest(conf.jsDist));
});

gulp.task('minify:html', function () {
    gulp.src(conf.htmlFiles)
        .pipe(minHTML())
        .pipe(gulp.dest(conf.distPath));
});

gulp.task('minify:img', function () {
    gulp.src(conf.imgFiles)
        .pipe(imgMin({optimizationLevel: 4}))
        .pipe(gulp.dest(conf.imgDist));
});