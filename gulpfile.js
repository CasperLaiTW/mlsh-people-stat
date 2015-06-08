var gulp = require('gulp'),
    webpack = require('gulp-webpack')


gulp.task('build', function () {
    return gulp.src('js/app.js')
        .pipe(webpack(require('./webpack.config')))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch(['js/**/*.js', 'index.html'], ['copy']);
});

gulp.task('copy', ['build'], function () {
    return gulp.src(['index.html', 'dist/**/*'], {base: '.'})
        .pipe(gulp.dest('public'));
});

gulp.task('default', ['watch', 'copy']);