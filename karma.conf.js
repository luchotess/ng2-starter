var webpackConfig = require('./webpack/webpack.test.js');

module.exports = function (config) {
  var _config = {
    basePath: '',

    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-coverage',
      'karma-spec-reporter',
      'karma-remap-istanbul',
      'karma-remap-coverage',
      'karma-junit-reporter',
      'karma-jasmine-html-reporter',
      'karma-sourcemap-loader',
      'karma-phantomjs-launcher',
      'remap-istanbul'
    ],

    frameworks: ['jasmine'],

    files: [
      './karma-test-shim.js'
    ],

    preprocessors: {
      './karma-test-shim.js': ['webpack', 'sourcemap']
    },

    coverageReporter: {
      type: 'in-memory'
    },

    remapCoverageReporter: {
      'text-summary': null,
      'json': './coverage/coverage.json',
      'html': './coverage/html',
      'lcovonly': './coverage/lcov.info'
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: {
        chunks: false
      }
    },

    webpackServer: {
      noInfo: true
    },

    browserNoActivityTimeout: 50000,

    reporters: ['spec', 'kjhtml', 'coverage', 'remap-coverage', 'junit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,


    jasmineDiffReporter: {
      multiline: true
    },

    junitReporter: {
      outputDir: './coverage',
      outputFile: 'junit.xml'
    }
  };

  config.set(_config);
};
