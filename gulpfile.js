var gulp = require('gulp'),
	del = require('del'),
	sass = require('gulp-sass'),
	jshint = require('gulp-jshint'),
	useref = require('gulp-useref'),
	uglify = require('gulp-uglify'),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	gulpIf = require('gulp-if'),
	runSequence = require('run-sequence'),
	install = require("gulp-install"),
	browserSync = require('browser-sync');


var paths = {
	js: [
		'./app/app.js',
		'./app/components/**/*.js',
		'./app/modules/**/*.js'
	],
	scss: [
		'./app/styles/base.scss'
	],
	html: [
		'./app/components/**/*.html',
		'./app/modules/**/*.html'
	]
};

/////////////////////////////////////////////////////////////////////////////////////
//
// runs clean to delete the dist directory
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean:dist', function() {
	return del.sync('dist');
});


/////////////////////////////////////////////////////////////////////////////////////
//
// runs install-dependencies to install frontend dependencies
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('install-dependencies', function() {
	return gulp.src([
			'./bower.json',
			'./package.json'
		])
		.pipe(install());
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs browserSync to live-reloading
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
	})
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs useref, concatenate and minify all the reference between
// <!--build:js js/main.min.js --><!-- endbuild -->
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
// runs minify-imgs to minify png, jpg, gif and even svg
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('minify-imgs', function() {
	return gulp.src('./app/images/**/*.+(png|jpg|gif|svg)')
		.pipe(cache(imagemin()))
		.pipe(gulp.dest('./dist/images'))
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs copy-fonts to move fonts to the dist directory
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('copy-fonts', function() {
	return gulp.src('./app/fonts/**/*')
		.pipe(gulp.dest('./dist/fonts'))
})

/////////////////////////////////////////////////////////////////////////////////////
//
// runs copy-bower-components
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('copy-bower-components', function() {
	gulp.src('./app/bower_components/**')
		.pipe(gulp.dest('./dist/bower_components'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs copy-components-html-files
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('copy-components-html-files', function() {
	gulp.src('./app/components/**/*.html')
		.pipe(gulp.dest('./dist/components'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs copy-modules-html-files
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('copy-modules-html-files', function() {
	gulp.src('./app/modules/**/*.html')
		.pipe(gulp.dest('./dist/modules'));
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
// runs the linter
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('lint', function() {
	return gulp.src(paths.js)
		.pipe(jshint())
		.pipe(jshint.reporter('default', {
			verbose: true
		}))
		.pipe(jshint.reporter('fail'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// watches file system and triggers a build when a modification is detected
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('watch', ['browserSync'], function() {
	gulp.watch(paths.js, ['lint', 'useref', browserSync.reload]);
	gulp.watch(paths.html, ['useref', 'copy-modules-html-files', browserSync.reload]);
	gulp.watch('./app/index.html', ['useref', browserSync.reload]);
	gulp.watch(paths.scss, ['sass', 'useref']);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs build tasks using runSequence
// to ensure that cleans get completed before the rest of the tasks
// because in a classic way Gulp activates all tasks in the second argument simultaneously.
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build', function(callback) {
	runSequence('clean:dist', [
		'sass',
		'useref',
		'minify-imgs',
		'copy-fonts',
		'copy-bower-components',
		'copy-components-html-files',
		'copy-modules-html-files',
		'lint'
	], callback);
});

gulp.task('default', function(callback) {
	runSequence('clean:dist', [
		'install-dependencies',
		'sass',
		'useref',
		'minify-imgs',
		'copy-fonts',
		'copy-bower-components',
		'copy-components-html-files',
		'copy-modules-html-files',
		'lint',
		'watch'
	], callback);
});
