const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const fileInclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');


let source = "src";
let destination = "./";

gulp.task('scss', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destination + '/css'))
        .pipe(browserSync.stream());
});

// JavaScript Task
gulp.task('js', function () {
    return gulp.src(source + '/js/**/*.js')
        .pipe(gulp.dest( destination + '/js'))
        .pipe(browserSync.stream());
});

// Task for copying fonts
gulp.task('fonts', function () {
    return gulp.src(source + '/fonts/**/*') 
        .pipe(gulp.dest(destination + '/fonts')); 
});

// Task for copying images
gulp.task('images', function () {
    return gulp.src(source + '/images/**/*') 
        .pipe(gulp.dest(destination + '/images')); 
});

// HTML Task
gulp.task('html', function () {
    return gulp.src(source + '/pages/**/*.html')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: source + '/layouts/'
        }))
        .pipe(gulp.dest(destination))
        .pipe(browserSync.stream());
});

// Serve and Watch Task
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: destination, 
            middleware: [historyApiFallback({
                rewrites: [
                    { from: /\/$/, to: '/index.html' }, // Rewrite root requests to '/index.html'
                    {
                        from: /\/[a-zA-Z0-9_\-]+$/, to: function (context) {
                            return context.parsedUrl.pathname + ".html";
                        }
                    } // Append '.html' to any other path
                ]
            })]
        }
    });
    gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
    gulp.watch('src/js/**/*.js', gulp.series('js'));
    gulp.watch(['src/pages/**/*.html', 'src/layouts/**/*.html'], gulp.series('html'));
    gulp.watch('src/fonts/**/*', gulp.series('fonts'));
    gulp.watch('src/images/**/*', gulp.series('images'));
    gulp.watch('src/**/**/*.html').on('change', browserSync.reload);
});

// Default Task
gulp.task('default', gulp.series(gulp.parallel('html', 'scss', 'js', 'fonts', 'images'), 'serve'));