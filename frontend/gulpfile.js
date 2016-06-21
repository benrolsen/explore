var gulp = require('gulp');
var glob = require('glob');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var debugFlag = true;

gulp.task('build', function() {
    var files = glob.sync('./src/**/*.js');
    browserify({
        entries: [files],
        debug: debugFlag
    })
    .transform(babelify, {presets: ["es2015", "react"]})
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js/'))
});

gulp.task('watch', function() {
    gulp.watch('./src/**/*.js', ['build']);
});

gulp.task('default', ['build', 'watch']);



