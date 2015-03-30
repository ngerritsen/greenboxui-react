var gulp = require('gulp');

var fs = require("fs");
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var babel = require('gulp-babel');
var browserify = require('browserify');
var babelify = require("babelify");
var karma = require('gulp-karma');
var compass = require('gulp-compass');
var source = require('vinyl-source-stream');

gulp.task('lint', function() {
    gulp.src(['./app/**/*.js', '!./app/bower_components/**', '!./app/bundle.js', '!./app/**/*.test.*'])
        .pipe(babel())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('test', function(){
   return gulp.src(['app/**/*.test.js'])
       .pipe(karma({
           configFile: './karma.conf.js',
           action: 'run'
       }))
       .on('error', function(err) {
           // Make sure failed tests cause gulp to exit non-zero
           throw err;
       });
});

gulp.task('bundle', function() {
    return browserify({
            debug: true,
            fullPaths: true,
            entries: "./app/main.js"
        })
        .transform(babelify.configure({
            ignore: /bower_components/
        }))
        .bundle()
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./app'));
});

gulp.task('compass', function(){
    gulp.src('')
});

gulp.task('clean', function() {
    gulp.src('./dist/*')
        .pipe(clean({force: true}));
});

gulp.task('minify-css', function() {
    var opts = {comments:true,spare:true};
    gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
        .pipe(minifyCSS(opts))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('minify-js', function() {
    gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
        .pipe(uglify({
            // inSourceMap:
            // outSourceMap: 'app.js.map'
        }))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('copy-bower-components', function () {
    gulp.src('./app/bower_components/**')
        .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('copy-html-files', function () {
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('connect', function () {
    connect.server({
        root: 'app/',
        port: 8889
    });
});

gulp.task('connectDist', function () {
    connect.server({
        root: 'dist/',
        port: 9999
    });
});

gulp.task('watch', function() {
    gulp.watch(['./app/**/*.js', '!./app/bundle.js'], ['lint', 'bundle']);
});

// default task
gulp.task('dev',
    ['lint', 'test', 'bundle', 'connect', 'watch']
);

// build task
gulp.task('build',
    ['lint', 'test', 'bundle', 'test', 'minify-css', 'minify-js', 'copy-html-files', 'copy-bower-components', 'connectDist']
);