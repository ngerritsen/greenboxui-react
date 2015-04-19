var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var path = require('path');
var browserSync = require('browser-sync').create();
var $ = require('gulp-load-plugins')();

const files = {
    bundle: 'bundle.js',
    entry: 'main.jsx'
};

const paths = {
    dist: './dist',
    root: './app',
    scripts: './app/**/*.js',
    react: './app/**/*.jsx',
    tests: './app/**/*.test.*',
    bower: './app/bower_components/**/*.*',
    styles: './app/assets/sass/*.scss'
};

function not(path) {
    return '!' + path;
}

gulp.task('lint', function() {
    gulp.src([paths.scripts, paths.react, not(paths.tests), not(path.resolve(paths.root, files.bundle)), not(paths.bower)])
        .pipe($.babel())
        .pipe($.jshint())
        .pipe($.jshint.reporter('default', { verbose: true }))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('scss-lint', function() {
    gulp.src([paths.styles])
        .pipe($.scssLint({
            'config': 'scsslint.yml'
        }))
        .pipe($.scssLint.failReporter());
});

gulp.task('test', ['lint'], function(){
   return gulp.src([paths.tests])
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
    var bundle = browserify({
            debug: true,
            extensions: ['.js', '.jsx'],
            entries: path.resolve(paths.root, files.entry)
        });

    executeBundle(bundle);
});

gulp.task('bundle-watch', function() {
    var bundle = browserify({
        debug: true,
        extensions: ['.js', '.jsx'],
        entries: path.resolve(paths.root, files.entry),
        cache: {},
        packageCache: {}
    });

    bundle = watchify(bundle);
    bundle.on('update', function(){
        executeBundle(bundle);
    });
    executeBundle(bundle);

});

function executeBundle(bundle) {
    var start = Date.now();
    bundle
        .transform(babelify.configure({
            ignore: /(bower_components)|(node_modules)/
        }))
        .bundle()

        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(source(files.bundle))
        .pipe(gulp.dest(paths.root))
        .pipe($.notify(function() {
            console.log('bundle finished in ' + (Date.now() - start) + 'ms');
        }))
        .pipe($.filter(files.bundle))
        .pipe(browserSync.reload({stream:true}));
}

gulp.task('compass', ['scss-lint'], function(){
    gulp.src('./app/assets/sass/main.scss')
        .pipe($.compass({
            css: 'app/assets',
            sass: 'app/assets/sass'
        }))
        .pipe($.filter('**/*.css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('clean', function() {
    gulp.src(path.resolve(paths.dist, '*'))
        .pipe($.clean({force: true}));
});

gulp.task('minify-css', function() {
    var opts = {comments:true,spare:true};
    gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
        .pipe($.minifyCss(opts))
        .pipe(gulp.dest('./dist/'))
        .pipe($.size({
            showFiles: true,
            title: 'CSS output file(s):'
        }));
});

gulp.task('minify-js', function() {
    gulp.src('./app/bundle.js')
        .pipe($.uglify())
        .pipe(gulp.dest('./dist/'))
        .pipe($.size({
            showFiles: true,
            title: 'JS output file(s):'
        }));
});

gulp.task('copy-bower-components', function () {
    gulp.src('./app/bower_components/**')
        .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('copy-html-files', function () {
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('optimize-image-files', function () {
    gulp.src('./app/**/*.png')
        .pipe($.imagemin())
        .pipe(gulp.dest('dist/'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: paths.root
        }
    });
});

gulp.task('connectDist', function () {
    $.connect.server({
        root: paths.dist,
        port: 9999
    });
});

gulp.task('watch', function() {
    gulp.watch([paths.scripts, paths.react, '!./app/bundle.js'], ['lint']);
    gulp.watch([paths.styles], ['compass']);
    gulp.watch(['./app/index.html'], browserSync.reload());
});

gulp.task('dev',
    ['compass', 'test', 'bundle-watch', 'serve', 'watch']
);

gulp.task('default', ['dev']);

gulp.task('build',
    ['lint', 'compass', 'test', 'bundle', 'test', 'minify-css', 'minify-js', 'copy-html-files', 'copy-bower-components', 'copy-image-files', 'connectDist']
);