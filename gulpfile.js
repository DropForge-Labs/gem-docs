var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('styles/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./styles/'));
});

//Watch task
gulp.task('default',function() {
    gulp.watch('styles/scss/*.scss',['styles']);
});



// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./styles/scss/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./styles/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./styles/"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
