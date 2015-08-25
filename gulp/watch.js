var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');

gulp.task('watch', function () {
    gulp.watch(conf.jsFiles, ['lint', 'minify:js']);
    gulp.watch(conf.lessFiles, ['less']);
    gulp.watch(conf.htmlFiles, ['minify:html']);
    gulp.watch(conf.imgFiles, ['minify:img']);
});