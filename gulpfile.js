var gulp = require('gulp'),
    webpack = require('gulp-webpack'),
    connect =require('gulp-connect');


gulp.task('build', function () {
    return gulp.src('js/app.js')
        .pipe(webpack(require('./webpack.config')))
        .pipe(gulp.dest('dist'));
});

gulp.task('connect', function () {
    connect.server({
        root: 'public',
        livereload: true
    })
});

gulp.task('copy', ['build'], function () {
    return gulp.src(['index.html', 'dist/**/*'], {base: '.'})
        .pipe(gulp.dest('public'));
});

gulp.task('default', ['connect', 'copy']);