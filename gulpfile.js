/**
 * Created by dell on 2017/11/20.
 */
const gulp = require('gulp');
const webpack = require('gulp-webpack');
const webpackConfig = require('./webpack.config');
const less = require('gulp-less');


gulp.task('webpack',function () {
    let myConfig = Object.create(webpackConfig);
    return gulp.src('./app/js/puzzle.js').pipe(webpack(myConfig)).pipe(gulp.dest('./dist/js/'));
});

gulp.task('makeless',function () {
    return gulp.src('./app/less/puzzle.less').pipe(less()).pipe(gulp.dest('./dist/sheet/'));
});

gulp.task('autoless', function () {
    gulp.watch('./app/less/**.less', ['makeless']);
});

gulp.task('autojavascript',function () {
    gulp.watch('./app/js/**.js',['webpack']);
});

gulp.task('default',['makeless','webpack','autoless','autojavascript']);