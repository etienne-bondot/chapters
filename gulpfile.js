var gulp = require('gulp'),
	del = require('del'),
	sass = require('gulp-sass'),
	jshint = require('gulp-jshint'),
	useref = require('gulp-useref'),
	uglify = require('gulp-uglify'),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin'),
	gulpIf = require('gulp-if'),
	browserSync = require('browser-sync');


var paths = {
	js: [
		'./app/app.js',
		'./app/components/**/*.js',
		'./app/modules/**/*.js'
	],
	scss: [
		'./app/styles/*.scss'
	],
	html: [
		'./app/components/*.html',
		'./app/modules/**/*.html',
		'./app/index.html'
	]
};

/////////////////////////////////////////////////////////////////////////////////////
//
// runs clean to delete the dist directory
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean', function() {
	return del(['./dist'], { force: true });
});


/////////////////////////////////////////////////////////////////////////////////////
//
// runs bower to install frontend dependencies
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('bower', function() {
	var install = require("gulp-install");

	return gulp.src([
		'./bower.json',
		'./package.json'
	]).pipe(install());
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs browserSync to live-reloading
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
	})
})

/////////////////////////////////////////////////////////////////////////////////////
//
// runs useref, concatenate all the reference between <!--build:js js/main.min.js --><!-- endbuild -->
// in the source file
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('useref', function() {
	return gulp.src('./app/index.html')
		.pipe(useref())
		// Minifies only if it's a JavaScript file
		.pipe(gulpIf('*.js', uglify()))
		// Minifies only if it's a CSS file
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('./dist'))
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs sass, creates css source maps
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('sass', function() {
	return gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest('./app/styles'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs jshint
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('jshint', function() {
	return gulp.src(paths.js)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// watches file system and triggers a build when a modification is detected
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('watch', ['sass', 'jshint', 'useref', 'browserSync'], function() {
	gulp.watch(paths.js, ['jshint', 'useref', browserSync.reload]);
	gulp.watch(paths.html, ['useref', browserSync.reload]);
	gulp.watch(paths.scss, ['sass', 'useref']);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// installs and builds everything, including sprites
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('default', ['bower', 'watch']);
