// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      // require( 'karma-phantomjs-launcher' ),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    // customLaunchers: {
    //   myChromeHeadless: {
    //     base: 'ChromeHeadless',
    //     flags: [
    //       '--headless',
    //       '--disable-gpu',
    //       // Without a remote debugging port, Google Chrome exits immediately.
    //       '--remote-debugging-port=9222',
    //       '--disable-web-security'
    //     ],
    //   }
    // },
    browsers: ['HeadlessChrome'],
    customLaunchers: {
      HeadlessChrome: {
        base: 'ChromeHeadless',
        flags: [
          // '--headless',
          '--disable-gpu',
          // Without a remote debugging port, Google Chrome exits immediately.
          '--remote-debugging-port=9222'
        ]
      },
      DebugChrome: {
        base: 'Chrome'
      }
    },    
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
//    browsers: ['myChromeHeadless'],
    singleRun: true
  });
};