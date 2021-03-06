var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
var cacheBuster = require('gulp-cache-bust');
var replace = require('gulp-replace');
var less = require('gulp-less');
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;




// Minify CSS and JS
gulp.task('useref', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        // Minifies only if it's a JavaScript file
        .pipe(gulpIf('*.js', uglify({ mangle: false }).on('error', function(e){
            console.log(e);
        })))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))

        .pipe(gulp.dest('public/'))
});

// Clean build folder
gulp.task('clean:dist', function() {
    return del.sync('public');
})

// Move static files
var filesToMove = [
        './app/assets/**/**/*',
    ];
gulp.task('static', function(){
    gulp.src(filesToMove, { base: './app/' })
        .pipe(gulp.dest('public/'));
});

// Cache Buster
gulp.task('cacheBuster', function () {
    return gulp.src('public/index.html')
        .pipe(cacheBuster())
        .pipe(gulp.dest('public'));
});


// Find and replace dev mode
gulp.task('disableDevMode', function(){
    gulp.src(['public/app.js'])
        .pipe(replace('html5Mode({enabled:!1,requireBase:!1})', 'html5Mode({enabled:!0,requireBase:!0})'))
        .pipe(replace('$scope.devMode=!0', '$scope.devMode=!1'))
        .pipe(gulp.dest('public/'));
});



// Build sequence
// Clean first, then the rest
gulp.task('build', function (callback) {
    runSequence(
        'clean:dist',
        ['useref', 'static', 'compile-less'],
        // ['useref', 'static'],
		['cacheBuster', 'disableDevMode'],
        callback
    )
})


// Because markermaker is deployed at wim.usgs.gov/markermaker,
// you must change the base href so it knows where to look for files
// This does it autoomatically on build-prod - which is called by the Github action
gulp.task('base-href', function() {
	return gulp.src('public/index.html')
	.pipe(replace('<base href="/">', function(match) {
		console.log('Replace called on', match);
		return'<base href="/markermaker/">'
	}))
	.pipe(gulp.dest('public/'));
});


// Same build sequence, but with the base href replacement
// for /markermaker url
gulp.task('build-prod', function (callback) {
    runSequence(
        'clean:dist',
        ['useref', 'static', 'compile-less'],
        // ['useref', 'static'],
		['cacheBuster'],
		'base-href',
        callback
    )
})

// Browsersync
// Watch for less changes
// Compile less on save
// inject CSS to browser
// Live reload for HTML and JS

gulp.task('compile-less', function () {
    gulp.src(['./app/stylesheets/less/main.less', './app/stylesheets/less/universal/markers.less'])
        .pipe(less())
        .pipe(gulp.dest('./app/stylesheets/css/'))
        .pipe(browserSync.stream());
}); 


gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: "./app/"
    });

    gulp.watch("app/stylesheets/less/**/*.less", ['compile-less']);


    // gulp.watch("./app/*.less").on("change", reload);
    gulp.watch("./app/**/*.html").on("change", reload);
    gulp.watch("./app/**/*.js").on("change", reload);
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['serve']);


gulp.task('serve-build', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: "./public/"
    });

});