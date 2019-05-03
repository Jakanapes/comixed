// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const isDocker = require('is-docker')();

module.exports = function (config) {
    config.set({
        customLaunchers: {
          ChromeCustom: {
            base: 'ChromeHeadless',
            // We must disable the Chrome sandbox when running Chrome inside Docker (Chrome's sandbox needs
            // more permissions than Docker allows by default)
            flags: isDocker ? ['--no-sandbox'] : []
          }
        },
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-firefox-launcher'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
            require('karma-verbose-reporter'),
            require('karma-mocha-reporter'),
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true
        },
        angularCli: {
            environment: 'dev'
        },
        // reporters: ['verbose', 'kjhtml', 'progress'],
        reporters: ['verbose'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeCustom'],
        singleRun: true,
    });
};
