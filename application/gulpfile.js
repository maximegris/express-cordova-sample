/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    runSequence = require('run-sequence'),
    del = require('del'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    useref = require('gulp-useref'),
	uglify = require('gulp-uglify'),
    browserSync = require('browser-sync');

var dist = 'CordovaJQM';
var root = gutil.env.root;

// define the default task and add the watch task to it
gulp.task('default', ['watch'],function() {
  gulp.watch([root + '/**/*.html', root + '/**/*.js', root + '/**/*.css'], ['build', browserSync.reload]);
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function(callback) {
  runSequence('build',  ['browserSync'],  callback);
});

// configure a live browser
gulp.task('browserSync', function() {
  console.log(gutil.env.type);
  browserSync({
    server: {
      baseDir: (gutil.env.type === 'production' || gutil.env.type === 'prod') ? dist + '/www' : root
    },
  })
});

// build files
gulp.task('build', function (callback) {
  runSequence('clean', ['copy-assets', 'build-js-css'], callback);
});

gulp.task('clean', function() {
  del.sync(dist + '/www/*');
});

gulp.task('copy-assets', function() {  
  return gulp.src([root + '/**/*.html', '!' + root + '/index.html', root + '/**/*.png',root + '/**/*.jpeg',root + '/**/*.gif',root + '/**/*.webp',root + '/**/*.svg'])
  .pipe(gulp.dest(dist + '/www'));
})

gulp.task('build-js-css', function (callback) {
	if(gutil.env.type === 'prod') {
		  runSequence('jshint', ['build-prod'], callback);
	} else {
		  runSequence('jshint', ['useref'], callback);
	}
});

gulp.task('build-prod', function (callback) {
	runSequence('useref', ['compress', ], callback);
})

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src(root + '/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('useref', function(){
  return gulp.src(root + '/index.html')
    .pipe(useref())
    .pipe(gulp.dest(dist + '/www'));
});

gulp.task('compress', function() {
  return gulp.src(dist + '/www/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(dist + '/www/js/'));
});