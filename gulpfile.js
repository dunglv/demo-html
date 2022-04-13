var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass')(require('sass')),
    uglify = require('gulp-uglify');

const TASK_JS = 'build-js',
    TASK_CSS = 'build-sass';

gulp.task(TASK_CSS, function(){
    return gulp.src('scss/**/*.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());

});

gulp.task(TASK_JS, function(){
    return gulp.src('js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function(){
    browserSync.init({
        server: "./"
    });
    gulp.watch('scss/**/*.scss',  gulp.series([TASK_CSS]));
    gulp.watch('js/**/*.js', gulp.series([TASK_JS]));
    gulp.watch("*.html").on('change', browserSync.reload);
});

