'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      rename = require('gulp-rename'),
      del = require('del');

sass.compiler = require('node-sass');

function cleanCss() {
    return del('./dist/assets/main.css');
}

function cleanAssets() {
    return del([
        './dist/assets/**/*',
        '!./dist/assets/main.css',
    ]);
}

function cleanTemplate() {
    return del('./dist/views/**/*.pug');
}

function compileSass() {
    return gulp
        .src('./src/assets/main.sass')
        .pipe(sass({
            outputStyle: 'expanded',
            sourceMapEmbed: true
        }))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('./dist/assets/'));
}

function copyAssets() {
    return gulp
        .src([
            './src/assets/**/*',
            '!./src/assets/**/*.sass',
        ])
        .pipe(gulp.dest('./dist/assets/'));
}

function copyViews() {
    return gulp
        .src('./src/views/**/*.pug')
        .pipe(gulp.dest('./dist/views/'));
}

exports.build = gulp.parallel([
    gulp.series([cleanCss, compileSass]),
    gulp.series([cleanAssets, copyAssets]),
    gulp.series([cleanTemplate, copyViews]),
]);

exports.watch = () => {
    gulp.watch('./src/assets/**/*.sass', gulp.series([cleanCss, compileSass]));
    gulp.watch([
        './src/assets/**/*',
        '!./src/assets/**/*.sass',
    ], gulp.series([cleanAssets, copyAssets]));
    gulp.watch('./src/views/**/*.pug', gulp.series([cleanTemplate, copyViews]));
};
