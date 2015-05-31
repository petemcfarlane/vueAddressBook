var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var partialify = require('partialify');
var rename = require('gulp-rename');


gulp.task('js', function() {
    gulp.src('src/app.js')
        .pipe(browserify({
            debug: true,
            transform: [partialify]
        }))
        //.pipe(uglify()) //can't uglify when browserify in debug mode
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.*', ['js']);
});