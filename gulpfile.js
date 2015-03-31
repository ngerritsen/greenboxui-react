var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var $ = require('gulp-load-plugins')();

gulp.task('lint', function() {
    gulp.src(['./app/**/*.js', '!./app/**/*.test.js', '!./app/bundle.js', '!./app/bower_components/**/*.*'])
        .pipe($.babel())
        .pipe($.jshint())
        .pipe($.jshint.reporter('default', { verbose: true }))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('test', function(){
   return gulp.src(['./app/**/*.test.js'])
       .pipe($.karma({
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
            entries: "./app/main.js"
        })
        .transform(babelify.configure({
            ignore: /(bower_components)|(node_modules)/
        }))
        .bundle()
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./app'));
});

gulp.task('compass', function(){
    gulp.src('./app/assets/sass/main.scss')
        .pipe($.compass({
            css: 'app/assets',
            sass: 'app/assets/sass'
        }))
});

gulp.task('clean', function() {
    gulp.src('./dist/*')
        .pipe($.clean({force: true}));
});

gulp.task('minify-css', function() {
    var opts = {comments:true,spare:true};
    gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
        .pipe($.minifyCSS(opts))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('minify-js', function() {
    gulp.src(['./app/bundle.js', '!./app/bower_components/**'])
        .pipe($.uglify({
            // inSourceMap:
            // outSourceMap: 'bundle.js.map'
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
    $.connect.server({
        root: 'app/',
        port: 8889
    });
});

gulp.task('connectDist', function () {
    $.connect.server({
        root: 'dist/',
        port: 9999
    });
});

gulp.task('watch', function() {
    gulp.watch(['./app/**/*.js', '!./app/bundle.js'], ['lint', 'bundle']);
});

gulp.task('dev',
    ['lint', 'compass', /*'test',*/ 'bundle', 'connect', 'watch']
);

gulp.task('default', ['dev']);

gulp.task('build',
    ['lint', 'compass', 'test', 'bundle', 'test', 'minify-css', 'minify-js', 'copy-html-files', 'copy-bower-components', 'connectDist']
);