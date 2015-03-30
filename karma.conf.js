module.exports = function(config) {
    config.set({
        basePath: './app',
        frameworks: ['browserify', 'jasmine'],
        browsers: ['Chrome'],
        preprocessors: {
            '**/*.test.js': ['browserify']
        },
        browserify: {
            debug: true,
            transform: ['babelify']
        }
    });
};