module.exports = function(config) {
    config.set({
        basePath: './app',
        frameworks: ['browserify', 'jasmine'],
        browsers: ['Chrome'],
        reporters: ['mocha'],
        preprocessors: {
            '**/*.test.js': ['browserify'],
            '**/*.test.jsx': ['browserify']
        },
        browserify: {
            debug: true,
            transform: ['babelify'],
            extensions: ['.jsx']
        },
        plugins: [
            'karma-jasmine',
            'karma-browserify',
            'karma-chrome-launcher',
            'karma-mocha-reporter'
        ]
    });
};